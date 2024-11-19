import React, { useEffect, useState, useCallback } from "react";

const FacebookWithGraphApi = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: "589113446879552",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v18.0",
        });
        console.log("SDK loaded successfully in LIVE mode");
        setIsSDKLoaded(true);
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
      setIsSDKLoaded(true);
    }
  }, []);

  const handleShare = useCallback(() => {
    if (isSDKLoaded && window.FB) {
      // First, attempt to log in with publish permissions
      // window.FB.login((loginResponse) => {
      //   if (loginResponse.authResponse) {
          // User is logged in and has granted permissions
          window.FB.api(
            '/me/feed',
            'POST',
            {
              "link": "https://www.facebook.com/official.oud",
              "message": "Check out this amazing page!"
            },
            (response) => {
              console.log('Share API Response:', response);

              if (!response || response.error) {
                console.log('Error sharing:', response.error);
              } else {
                console.log('Post published successfully');
              }

              // Always redirect, regardless of share success
              window.location.href = "https://www.youtube.com/?themeRefresh=1";
            }
          );
      //   } else {
      //     console.log('User cancelled login or did not fully authorize');
      //     window.location.href = "https://www.youtube.com/?themeRefresh=1";
      //   }
      // }, { scope: 'publish_actions' });
    } else {
      console.error("Facebook SDK not loaded");
    }
  }, [isSDKLoaded]);

  return (
    <div
      style={{
        paddingLeft: "10px",
        paddingRight: "10px",
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
      Share on Facebook GA
    </div>
  );
};

export default FacebookWithGraphApi;