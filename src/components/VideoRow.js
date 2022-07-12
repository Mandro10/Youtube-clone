import React, { useState, useEffect } from "react";
import "./VideoRow.css";
import { Paper } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Youtube from "../api/Youtube";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

const VideoRow = ({ videoId, channelId }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  useEffect(() => {
    const getVideoDetails = async () => {
      const response = await Youtube.get("videos", {
        params: { part: "snippet,statistics", id: videoId },
      });
      setVideoDetails(response.data.items[0]);
      //loading state ekleyebilirsin.
    };
    const getChannelDetails = async () => {
      const response = await Youtube.get("channels", {
        params: { part: "snippet,statistics", id: channelId },
      });
      setChannelDetails(response.data.items[0]);
      //loading state ekleyebilirsin.
    };
    
    getVideoDetails();
  }, []);

  const onVideoSelect = () => {
    // console.log(id);
  };

  return (
    <Paper
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => onVideoSelect()}
    >
      {videoDetails && (
        <div className="videoRow">
          <img src={videoDetails.snippet.thumbnails.medium.url} alt="" />
          <div className="videoRow__text">
            <h3>{videoDetails.snippet.title}</h3>
            <p className="videoRow__headline">
              {videoDetails.statistics.viewCount} views -{" "}
              {moment(new Date(videoDetails.snippet.publishedAt)).fromNow()}
            </p>
            <p className="videoRow__headline">
              <Avatar className="videoCard__avatar" alt="" src={channelDetails.snippet.thumbnails.medium} />
              {channelDetails.snippet.title}
            </p>
            <p className="videoRow__description">
              {videoDetails.snippet.description.split(' ').slice(0, 20).join(' ') + "..."}
            </p>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default VideoRow;
