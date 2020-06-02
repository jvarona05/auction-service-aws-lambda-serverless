import { getAuctionById  } from './getAuction'
import { uploadPictureToS3  } from '../lib/uploadPictureToS3'

async function uploadAuctionPicture(event, context) {
    const { id } = event.pathParameters
    const auction = await getAuctionById(id)
    const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');

    const uploadPictureToS3Result = await uploadPictureToS3(auction.id + '.png', buffer)

    console.log(uploadPictureToS3Result)

    return {
        statusCode: 200,
        body: JSON.stringify({hola2: 'hola'})
    };
}

export const handler = uploadAuctionPicture