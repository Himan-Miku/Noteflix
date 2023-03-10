"use client";

import Options, { iNote } from "./Options";
import { useRouter } from "next/navigation";

type noteProps = {
  id: string;
  content: string | null;
  title: string;
  bgImage: string | null;
};

export interface modNote {
  id: string;
  bgImage: string;
}

const Note = ({ id, content, title, bgImage }: noteProps) => {
  const router = useRouter();

  const bgImageFn = async (image: string) => {
    const noteImage = await fetch("/api/notes", {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        bgImage: image,
      }),
    });
    const colouredNote: iNote = await noteImage.json();
    console.log(colouredNote);

    router.refresh();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPositionX: "right",
        backgroundPositionY: "bottom",
        backgroundSize: "cover",
      }}
      className={`inline-block p-3 mb-4 w-full h-max border border-1 border-[#575B5F] rounded-lg`}
    >
      <div className="px-2">
        <h3 className="text-[#f5f5f5] font-semibold text-lg">{title}</h3>
      </div>
      <div className="p-2">
        <p className="text-[#f5f5f5] font-normal leading-[1.35rem] text-sm max-h-64 break-words overflow-y-auto scrollbar-hide">
          {content}
        </p>
      </div>
      <div>
        <Options
          id={id}
          title={title}
          content={content}
          bgImage={bgImage}
          bgImageFn={bgImageFn}
        />
      </div>
    </div>
  );
};

export default Note;
