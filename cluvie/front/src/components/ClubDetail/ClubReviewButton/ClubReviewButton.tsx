/* eslint-disable import/extensions */
import React, { useState } from "react";
import { Button, Modal, Rating } from "@mui/material";
import * as Style from "./ClubReviewButtonStyle";
import * as Api from "@/utils/api";

function ClubReviewButton({ clubId }: { clubId: number }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleToggle = () => setOpen((prev) => !prev);
  const handleSubmitReview = () => {
    Api.post(`/clubs/${clubId}/review`, {
      star_rating: rating,
      contents: review,
    })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("참여 후기는 한 번만 작성할 수 있습니다.");
      });

    handleToggle();
  };
  const handleChangeRating = (
    event: React.SyntheticEvent,
    value: number | null
  ) => {
    if (value) setRating(value);
  };
  const handleChangeReview = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  return (
    <div>
      <Style.ReviewButton color='inherit' onClick={handleToggle}>
        참여 후기 작성
      </Style.ReviewButton>
      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Style.ReviewBox>
          <div className='rating'>
            <div>클럽에 대한 별점을 매겨주세요</div>
            <div>
              <Rating onChange={handleChangeRating} />
            </div>
          </div>
          <div>
            <textarea
              className='review-textarea'
              placeholder='참여 후기를 작성해주세요'
              onChange={handleChangeReview}
            />
          </div>
          <div>
            {rating && review ? (
              <Button color='inherit' onClick={handleSubmitReview}>
                제출
              </Button>
            ) : (
              <Button color='inherit' disabled>
                제출
              </Button>
            )}
            <Button color='inherit' onClick={handleToggle}>
              취소
            </Button>
          </div>
        </Style.ReviewBox>
      </Modal>
    </div>
  );
}

export default ClubReviewButton;
