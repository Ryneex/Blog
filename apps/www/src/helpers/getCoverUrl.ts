import { cloudinary } from "@/lib/cloudinary"
import { sendError } from "./sendError"
import { ErrorResponse, SuccessResponse } from "@/types"

type ITypeGetCoverUrl = ErrorResponse | SuccessResponse<{ url: string }>
/**
 * If the `cover` is already a URL, the function just returns it. If it's a file, the function uploads it to Cloudinary and then returns the URL.
 */
export async function getCoverUrl(cover: string | File, blogId: string, existingBlogCoverUrl?: string): Promise<ITypeGetCoverUrl> {
    if (typeof cover === "string") {
        if (cover !== existingBlogCoverUrl && existingBlogCoverUrl?.includes("res.cloudinary.com")) await cloudinary.v2.api.delete_resources(["blogApp/blogCover/" + blogId])
        return { success: true, url: cover }
    }

    const res: ITypeGetCoverUrl = await new Promise(async (res) => {
        const stream = cloudinary.v2.uploader.upload_stream({ resource_type: "image", folder: "/blogApp/blogCover", public_id: blogId }, (err, data) => {
            if (err) return res(sendError(err.message))
            if (data) return res({ success: true, url: data.secure_url })
            res(sendError("something went wrong"))
        })
        stream.end(Buffer.from(await cover.arrayBuffer()))
    })
    return res
}
