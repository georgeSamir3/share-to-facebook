// import React, { useEffect, useState } from "react";

// const FacebookShareButtonT = () => {
//   const [isSDKLoaded, setIsSDKLoaded] = useState(false);

//   useEffect(() => {
//     if (!window.FB) {
//       window.fbAsyncInit = () => {
//         window.FB.init({
//           appId: "562390009714057", // Replace with your Facebook app ID
//           autoLogAppEvents: true,
//           xfbml: true,
//           version: "v18.0",
//         });
//         setIsSDKLoaded(true);
//       };

//       (function (d, s, id) {
//         const fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) return;
//         const js = d.createElement(s);
//         js.id = id;
//         js.src = "https://connect.facebook.net/en_US/sdk.js";
//         fjs.parentNode.insertBefore(js, fjs);
//       })(document, "script", "facebook-jssdk");
//     } else {
//       setIsSDKLoaded(true);
//     }
//   }, []);

//   const handleShare = () => {
//     if (isSDKLoaded && window.FB) {
//       let callbackTriggered = false;

//       window.FB.ui(
//         {
//           method: "share",
//           href: "https://www.facebook.com/official.oud",
//         },
//         function (response) {
//           if (!callbackTriggered) {
//             callbackTriggered = true;

//             if (response && typeof response.error_message === "undefined") {
//               console.log("Content shared successfully");
//             } else if (response === null || response === undefined) {
//               console.log("Premature callback triggered, ignoring.");
//             } else {
//               console.log("Share canceled or failed:", response.error_message || "No further details");
//             }
//           }
//         }
//       );
//     } else {
//       console.error("Facebook SDK not loaded");
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "250px",
//         height: "40px",
//         borderRadius: "10px",
//         backgroundColor: "#072051",
//         border: "1px solid grey",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         cursor: "pointer",
//       }}
//       onClick={handleShare}
//     >
//       Share on Facebook T2
//     </div>
//   );
// };

// export default FacebookShareButtonT;

import React, { useEffect, useState, useRef } from "react";

const FacebookShareButtonT = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const dialogOpenedAt = useRef(null);
  const minimumDialogTime = 2000; // 2 seconds minimum time for valid interaction

  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: "589113446879552",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v18.0",
        });
        console.log("SDK loaded successfully");
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

  const handleCallback = (response) => {
    const timeElapsed = Date.now() - dialogOpenedAt.current;

    // Ignore callbacks that happen too quickly
    if (timeElapsed < minimumDialogTime) {
      console.log("Premature callback detected, ignoring");
      return;
    }

    if (response && typeof response.error_message === "undefined") {
      console.log("Content shared successfully");
    } else if (response === null || response === undefined) {
      console.log("Share cancelled");
    } else {
      console.log(
        "Share failed:",
        response.error_message || "No further details"
      );
    }
  };

  const handleShare = () => {
    if (isSDKLoaded && window.FB) {
      // Record when the dialog is opened
      dialogOpenedAt.current = Date.now();

      window.FB.ui(
        {
          method: "share",
          href: "https://www.facebook.com/official.oud",
          display: "popup",
        },
        handleCallback
      );
    } else {
      console.error("Facebook SDK not loaded");
    }
  };
  const shareOpenGraph = () => {
    if (isSDKLoaded && window.FB) {
      window.FB.ui(
        {
          display: "popup",
          method: "share_open_graph",
          action_type: "og.shares",
          action_properties: JSON.stringify({
            object: "https://developers.facebook.com/docs/",
          }),
        },
        function (response) {
          console.log("response from open graph",response);
        }
      );
    }
  };

  return (
    <>
      <div
        style={{
          // width: "350px",
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
        Share on Facebook T2
      </div>
      <div
        style={{
          // width: "350px",
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
        onClick={shareOpenGraph}
      >
        Share open graph
      </div>{" "}
    </>
  );
};

export default FacebookShareButtonT;
