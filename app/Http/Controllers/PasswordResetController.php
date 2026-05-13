<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Mail\ResetPasswordOtpMail;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    /**
     * Send a 6-digit OTP to the user's email.
     */
    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'We could not find an account with that email address.',
        ]);

        $email = $request->email;
        $otp = sprintf('%06d', mt_rand(100000, 999999));

        // Delete any existing OTP for this email
        DB::table('password_reset_tokens')->where('email', $email)->delete();

        // Save new OTP
        DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => $otp,
            'created_at' => Carbon::now(),
        ]);

        // Send Email
        Mail::to($email)->send(new ResetPasswordOtpMail($otp));

        return response()->json(['message' => 'OTP sent successfully. Please check your email.']);
    }

    /**
     * Verify the OTP provided by the user.
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->otp)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid OTP.'], 400);
        }

        // Check if OTP is expired (e.g., 15 minutes)
        if (Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
            // Delete expired OTP
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json(['message' => 'OTP has expired. Please request a new one.'], 400);
        }

        return response()->json(['message' => 'OTP verified successfully.']);
    }

    /**
     * Reset the user's password.
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Re-verify OTP to ensure security before resetting
        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->otp)
            ->first();

        if (!$record || Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
            return response()->json(['message' => 'Invalid or expired OTP.'], 400);
        }

        // Update password
        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the OTP
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password reset successfully. You can now log in.']);
    }
}
