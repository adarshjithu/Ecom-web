import { formatedDate } from "@/helpers/dateHelper";
import { CircleCheck, Star } from "lucide-react";

const ReviewCard = ({ data }) => {
  return (
    <div
      className="rounded-[12px] border border-[var(--border)] p-4 bg-white flex flex-col"
      style={{ height: "200px" }} // fixed height
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-[var(--primary)] flex items-center space-x-1">
          <span>{data?.user?.name}</span>
          <CircleCheck className="text-[#fff] fill-[#577BEC] w-4 h-4" />
        </div>
      </div>

      {/* Rating + Date */}
      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-1">
        <div
          className="rounded-[8px] p-[.3px] w-fit"
          style={{
            background: "linear-gradient(90deg, #EDE8CA 0%, #FFFFFF 100%)",
          }}
        >
          <div
            className="flex items-center space-x-1 rounded-[8px] px-1 py-[2px]"
            style={{
              background: "linear-gradient(90deg, #FFFADD 0%, #FFFFFF 100%)",
            }}
          >
            <Star className="text-[#E09A01] fill-[#E09A01] w-3 h-3" />
            <span className="font-medium text-[#E09A01] text-xs">
              {data?.rating}
            </span>
          </div>
        </div>
        <span className="mx-1">•</span>
        <span>{data.createdAt ? formatedDate(data.createdAt) : data.time}</span>
      </div>

      {/* Title + Comment */}
      <div className="mt-2 font-medium text-base text-[var(--primary)] line-clamp-1">
        {data?.title}
      </div>
      <p className="text-[var(--secondary)] text-sm mt-1 overflow-hidden text-ellipsis line-clamp-4">
        {data?.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
