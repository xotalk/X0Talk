
import { AccessToken, Role } from '@huddle01/server-sdk/auth';

const generateAccessToken = async () => {
    const accessToken = new AccessToken({
        apiKey,
        roomId: "8NQbw-Ds5xZ4TVJMfBDWm7U00qC7pDWv",
        role: Role.HOST,
        permissions: {
            admin: true,
            canConsume: true,
            canProduce: true,
            canProduceSources: {
                cam: true,
                mic: true,
                screen: true,
            },
            canRecvData: true,
            canSendData: true,
            canUpdateMetadata: true,
        },
        options: {
            metadata: {
                // you can add any custom attributes here which you want to associate with the user
                walletAddress: "vrajdesai.eth"
            },
        },
    });
    const token = await accessToken.toJwt();
    return token;
}