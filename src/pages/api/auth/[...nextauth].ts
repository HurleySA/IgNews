import { Create, Collection, If, Not, Exists, Match, Index, Casefold, Get } from "faunadb";

import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import { fauna } from "../../../services/fauna";

export default NextAuth({
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          authorization: { params: {  scope: 'read:user'}},
        }),

    ],
    secret: process.env.SECRET_KEY
    ,
    callbacks:{
      async signIn({user, account, profile}){   
        const { email } = user;

        try{
          await fauna.query(
            If(
            
            Not(Exists(Match(Index('user_by_email'), Casefold(user.email)))),

            Create(Collection('users'),{ data: { email } }),

            Get(Match(Index('user_by_email'), Casefold(user.email)))
            )
          )
          return true;
        }catch {
          return false;
        }
       
      },
    }


})