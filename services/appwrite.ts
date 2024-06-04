import { Client, Account, ID } from 'appwrite';
import { router, usePathname } from 'expo-router';
import { atom, useRecoilState } from 'recoil';


export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });

class AppwriteService {

    private client: Client;
    private account: Account;
    public userID: any;
    public userData: any;

    constructor() {
        this.client = new Client();
        this.client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('665b2b390024f5068e73');
        this.account = new Account(this.client); 
    }

    // Method to send a verification code to the user's phone
    async createPhoneSession(phoneNumber: string) {
        try {
            const sessionToken:any = await this.account.createPhoneToken(
                ID.unique(),
                `+91${phoneNumber}`
             ); 

             console.log(sessionToken);

             this.userID = sessionToken.userId;
             router.push("/otpVerification");

        } catch (error) {
            console.error('Failed to send verification code:', error);
            throw error;
        }
    }

    // Method to verify the phone number with the code sent to the user
    async verifyPhoneSession(secret: string) {
        try {
            const response = await this.account.updatePhoneSession(this.userID, secret);
            let queryParams : any = {
                pathname:'/explore',
                query: {params: response}
            }
            router.push(queryParams);        
        } catch (error) {
            console.error('Failed to verify phone session:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        this.userData = await this.account.get();
        return this.userData;
    }
}

export default new AppwriteService();