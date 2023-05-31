export interface UserLoginData {
    login: {
        success: boolean;
        message: string;
    }
}

export interface ResendCodeData {
    resendCode: {
        success: boolean;
        message: string;
    }
}

export interface VerifyPhoneData {
    verify: {
        success: boolean;
        message: string;
    }
}