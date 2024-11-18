import React, { useEffect, useState } from "react";

const FacebookShareButton = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the SDK is already loaded
    if (!window.FB) {
      // Load the Facebook SDK script
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: "562390009714057", // Replace with your Facebook app ID
          autoLogAppEvents: true,
          xfbml: true,
          version: "v18.0",
        });
        setIsSDKLoaded(true); // SDK is loaded
      };

      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    } else {
      console.log("SDK loaded");
      setIsSDKLoaded(true); // SDK is already loaded
    }
  }, []);

  // Share function
  const handleShare = () => {
    if (isSDKLoaded && window.FB) {
      window.FB.ui(
        {
          method: "share",
          href: "https://www.facebook.com/official.oud", // URL to be shared
        },
         (response)=> {
          console.log("res", response);
          if (response && !response.error_message) {
            console.log("Content shared successfully");
            // window.location.href = "http://localhost:3000/";

            // window.close();
          } else {
            console.log("Share canceled or failed");
            // window.location.href = "https://www.youtube.co";
          }
        }
      );
    } else {
      console.error("Facebook SDK not loaded");
    }
  };

  return (
    // <button onClick={handleShare}>
    //   Share on Facebook
    // </button>
    <div
      style={{
        width: "250px",
        height: "40px",
        borderRadius: "10px",
        backgroundColor: "#072051",
        border: "1px solid grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleShare}
    >
      Share on Facebook
    </div>
  );
};

export default FacebookShareButton;
