import jwt,{ verify } from 'jsonwebtoken'
import {RedisClient} from '../config/redis'
import dotenv from 'dotenv'
dotenv.config()

export const verifyResetToken = async (token: string, expectedPurpose: string) => {
  try {
    const currentLink = `${process.env.CLIENT_URL!}/reset-password?token=${token}`
      const decoded = verify(token, process.env.JWT_TOKEN_SECRET!) as {
          userId: string
          email: string
          purpose: string
        }
        
        if (decoded.purpose !== expectedPurpose) {
            throw new Error('Invalid token purpose')
        }
        
    const storedLink = await RedisClient.get(`magicLink:${decoded.email}`)
    if (!storedLink) throw new Error('Invalid or expired token')
        const parsedStoredLink = JSON.parse(storedLink);
   if(parsedStoredLink.magicLink !== currentLink)
     throw new Error("Invalid or expired token")

    return decoded
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export const createRefreshToken = (userId:string, role:string) => {
 return jwt.sign(
      { userId,role },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
  );
}

export const createAccessToken = (userId:string, role:string) => {
  return jwt.sign(
    { userId, role },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
);
}

export const extractUserFromRefreshToken = (
  refreshToken: string
): { userId: string; role: string } | null => {
  try {
    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as { userId: string; role: string };
    
    return user;
  } catch (error) {
    console.error("Invalid refresh token", error);
    return null;
  }
};