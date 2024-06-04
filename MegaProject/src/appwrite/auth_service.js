import { Client, Databases, Account , ID} from "appwrite";
import conf from '../config/config.js'

export class AuthService {

    client = new Client();
    account;
    database;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
        this.database = new Databases(this.client)
    }

    async creatUserAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login();
            }else{
                return userAccount;
            }

        }catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try {
            const loggedIn = await this.account.createEmailPasswordSession(email, password);
            return loggedIn;

        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            const user = await this.account.get();
            return user;
        }catch(error){
            throw error;
        }
        
        return null;
    }

    async logout(){
        try{
             await this.account.deleteSessions();
        }catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService;