// import React, { useEffect } from 'react';

// const FacebookShareButton = () => {
//   // Initialize Facebook SDK
//   useEffect(() => {
//     if (!window.FB) {
//       console.log("init");
//       window.fbAsyncInit = () => {
//         window.FB.init({
//           appId: '1609601133328611',
//           autoLogAppEvents: true,
//           xfbml: true,
//           version: 'v18.0',
//         });
//       };
//     }
//   }, []);

//   // Share function
//   const handleShare = () => {
//     if (window.FB) {
//       window.FB.ui(
//         {
//           method: 'share',
//           href: 'https://yourwebsite.com/shared-content', // URL to be shared
//         },
//         function (response) {
//           if (response && !response.error_message) {
//             console.log('Content shared successfully');
//           } else {
//             console.log('Share canceled or failed');
//           }
//         }
//       );
//     } else {
//       console.error('Facebook SDK not loaded');
//     }
//   };

//   return (
//     <button onClick={handleShare}>
//       Share on Facebook
//     </button>
//   );
// };

// export default FacebookShareButton;

import React, { useEffect, useState } from "react";

const FacebookShareButton = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

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
        function (response) {
          if (response && !response.error_message) {
            console.log("Content shared successfully");
          } else {
            console.log("Share canceled or failed");
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
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer"
      }}
      onClick={handleShare}
    >
      Share on Facebook
    </div>
  );
};

export default FacebookShareButton;
