import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import CommentShowCard from "~/components/CommentShowCard";
import { H1 } from "~/components/Headings";
import { getFeedComments, type FeedPostType } from "~/modules/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "timeDesc" as FeedPostType;
    const pagingNumber = url.searchParams.get("p") || 1;
    const chunkSize = url.searchParams.get("chunkSize") || 12;
    const likeFromHour = url.searchParams.get("likeFromHour") || 48;
    const likeToHour = url.searchParams.get("likeToHour") || 0;

    const commentFeedData = await getFeedComments(Number(pagingNumber), type as FeedPostType, Number(chunkSize), Number(likeFromHour), Number(likeToHour));

    return json({ commentFeedData });
}

export default function Comment(){
    const { commentFeedData } = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const currentPage = commentFeedData.meta.currentPage;
    const totalCount = commentFeedData.meta.totalCount;
    const totalPages = Math.ceil(commentFeedData.meta.totalCount / commentFeedData.meta.chunkSize);

    const handleFeedTypeChange = (orderby: string) => {
        const formData = new FormData();
        formData.append("action", "commentFeedTypeChange");
        formData.append("type", orderby);
        submit(formData, { method: "post" });
    }

    const handlePageChange = (action: string) => {
        const formData = new FormData();
        formData.append("action", action);
        formData.append("currentPage", currentPage.toString());
        formData.append("chunkSize", commentFeedData.meta.chunkSize.toString());
        formData.append("totalCount", totalCount.toString());
        formData.append("type", commentFeedData.meta.type);
        submit(formData, { method: "post" });
    }

    return (
        <div>
            <H1>コメント</H1>
            <div className="feed-meta">
                <p>コメント数: {commentFeedData.meta.totalCount}件</p>
            </div>
            <div>
                <select onChange={(e) => handleFeedTypeChange(e.target.value)} className="select select-bordered select-sm">
                    <option value="timeDesc" className="select-option" selected={commentFeedData.meta.type === "timeDesc"}>新着順</option>
                    <option value="timeAsc" className="select-option" selected={commentFeedData.meta.type === "timeAsc"}>古い順</option>
                    <option value="likes" className="select-option" selected={commentFeedData.meta.type === "likes"}>いいね順</option>
                    <option value="unboundedLikes" className="select-option" selected={commentFeedData.meta.type === "unboundedLikes"}>無期限いいね順</option>
                </select>
            </div>
            <div className="comment-feed">
                {commentFeedData.result.map((comment) => (
                    <CommentShowCard
                        key={comment.commentId}
                        postId={comment.postId}
                        postTitle={comment.postTitle}
                        countLikes={comment.countLikes}
                        countDislikes={comment.countDislikes}
                        commentId={comment.commentId}
                        commentContent={comment.commentContent}
                        commentAuthor={comment.commentAuthor}
                        commentDateGmt={new Date(comment.commentDateGmt)}
                    />
                ))}
            </div>
            <div className="search-navigation flex justify-center my-4">
                {totalPages >= 1 && (
                <div className="join">
                    <button
                    className="join-item btn btn-lg"
                    onClick={() => handlePageChange("firstPage")}
                    disabled={currentPage === 1}
                    type="submit"
                >
                    «
                </button>
                <button
                    className="join-item btn btn-lg"
                    onClick={() => handlePageChange("prevPage")}
                    disabled={currentPage === 1}
                    type="submit"
                >
                    ‹
                </button>
                <div className="join-item bg-base-200 font-bold text-lg flex items-center justify-center min-w-[100px]">
                    {currentPage} / {totalPages}
                </div>
                <button
                    className="join-item btn btn-lg"
                    onClick={() => handlePageChange("nextPage")}
                    disabled={currentPage === totalPages}
                    type="submit"
                >
                    ›
                </button>
                <button
                    className="join-item btn btn-lg"
                    onClick={() => handlePageChange("lastPage")}
                    disabled={currentPage === totalPages}
                    type="submit"
                >
                    »
                </button>
                </div>
            )}
            </div>
        </div>
    )
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const action = formData.get("action");
    const type = formData.get("type");
    const currentPage = formData.get("currentPage");

    if (action === "commentFeedTypeChange") {
        return redirect(`/comment?type=${type}&p=1`);
    }

    if (action === "firstPage"){
        return redirect(`/comment?type=${type}&p=1`);
    }

    if (action === "prevPage"){
        return redirect(`/comment?type=${type}&p=${Number(currentPage) - 1}`);
    }

    if (action === "nextPage"){
        return redirect(`/comment?type=${type}&p=${Number(currentPage) + 1}`);
    }

    if (action === "lastPage"){
        const chunkSize = formData.get("chunkSize");
        const totalCount = formData.get("totalCount");
        const lastPage = Math.ceil(Number(totalCount) / Number(chunkSize));
        return redirect(`/comment?type=${type}&p=${lastPage}`);
    }
}
    