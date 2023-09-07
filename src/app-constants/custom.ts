enum AppConstants  {

    /**
     * The specified email already exists in the server
     */
    USER_EXISTS = 'Username Taken!',

    /**
     * User details not found in database 
     */
    USER_NOT_FOUND = 'User does not exist',

    /**
     * User email not yet verified 
     */
    ACCOUNT_NOT_ACTIVE = `Your account is not active. Please verify your email.`,

    /**
     * User account was suspended by admin
     */
    ACCOUNT_SUSPENDED = 'Your account has been suspended. Contact admin for further instructions.',

    /**
     * The Authourization header is missing or is not valid
     */
    BAD_AUTH_HEADERS = 'Bad or missing authourization headers',

    /**
     * The Email or password provided is incorrect
     */
    INVALID_LOGIN_DETAILS = 'Invalid login details.',
    /**
     * Input fields are incomplete or have invalid types
     */
    BAD_INPUT_FILED = 'Incorrect or incomplete input fields',

    /**
     * Characters used to generate restaurant ID
     */
    ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',

    /**
     * characters for generating OTP
     */
    OTP_CHARS = '0123456789',

    /**
     * Creation of the restaurant failed
     */
    CREATION_FAIL = 'Restaurant creation failed',

    /**
     * The specified restaurant could not be found
     */
    DOES_NOT_EXIST = 'The Restaurant you\'re looking for doesn\'t exist',

    ITEM_ALREADY_EXISTS = 'ITEM ALREADY EXISTS',

    USER_ALREADY_SUSPENDED = 'This user is alradey suspended.',
    /**
     * Theotp the user entered does not match what's sent to the provided email
     */
    BAD_OTP = 'INVALID OTP',

    SERVER_ERROR ='An error occured, please try again in a few minutes'

}
export default AppConstants;
