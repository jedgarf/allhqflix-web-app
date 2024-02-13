import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const shortenTextHeight = (string, num) => {
  return string?.length > num ? string.substr(0, num - 1) + "..." : string;
};

const streamDashboardBackButton = (navigate, type, isShare) => {

  if (isShare) {

      switch (type) {
        case 'movies':
          navigate(`/foreign/${type}`);
          break;

        case 'tvshow':
          navigate(`/foreign/${type}`);
          break;
      
        default:
          navigate(`/${type}`);
          break;
      }
      
  } else {
      navigate(-1);
  }

}

const moveToClassName = (className) => {
  const element = document.getElementsByClassName(className);
  if (element) {
  element[0].scrollIntoView({ behavior: "smooth" });
  }
};

const moveToTop = () => {
    const element = document.getElementsByClassName('top');
    if (element) {
    element[0].scrollIntoView({ behavior: "smooth" });
    }
};

const copyMovieLink = (link) => {
    link = link + "&share=true";
    navigator.clipboard.writeText(link).then(
        () => {
            // invoked if the data is copied
            console.log("Copied successfully");
        },
        () => {
            // handle data copy error
            console.log("Copying failed");
        }
      )
}

const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = useState({ pxWidth: 0, pxHeight: 0 })
  
    useEffect(() => {
      const getDimensions = () => ({
        pxWidth: myRef.current ? myRef.current.offsetWidth : 0,
        pxHeight: myRef.current ? myRef.current.offsetHeight : 0
      })
  
      const handleResize = () => {
        setDimensions(getDimensions())
      }
  
      if (myRef.current) {
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return dimensions;
  };

  const getFileExtention = (filename) => {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }

  const destroyHls = (artInstance) => {
    try {
      artInstance.destroy(false);
      console.log("player destroyed");
    } catch (error) {
      console.log("cannot destroy player");
    }
  }

  const SeparateArrayByComma = ({ type, data, link }) => {

    return (
      <>
        {data?.map((item, i) => {
          return (
            <span key={i}>
              {i === 0 ? " " : ", "}
              {type === "site_link" ?
                <Link className='text-link' title={item} to={`${link}${item}`} style={{ cursor: 'pointer' }}>
                  {item}
                </Link>
               : type === "google_link" ? 
                <a className='text-link' href={`${link}${item}`} alt={item} title={item} rel='noreferrer' target='_blank' style={{ cursor: 'pointer' }}>
                  {item}
                </a>
               : 
               <>{item}</>}
            </span>
          );
        })}
      </>
    )

  }

  const SeparateArrayButtons = ({ type, color, data, link }) => {
    return (
      <>
        {data?.map((item, i) => {
          return (
            <span key={i}>
              {type === "site_link" ?
                <Link className='text-link-without-underline' title={item} to={`${link}${item}`} style={{ cursor: 'pointer', marginRight: '5px' }}>
                  <Button variant="outlined" size="small" color={color}>{item}</Button>
                </Link>
               : type === "google_link" ? 
                <a className='text-link-without-underline' href={`${link}${item}`} alt={item} title={item} rel='noreferrer' target='_blank' style={{ cursor: 'pointer', marginRight: '5px' }}>
                  <Button variant="outlined" size="small" color={color}>{item}</Button>
                </a>
               : 
               <Button variant="outlined" size="small" color={color} style={{ cursor: 'pointer', marginRight: '5px' }}>{item}</Button>}
            </span>
          );
        })}
      </>
    )
  }

  const separatedSeasons = (xs, key) => {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
  }

  const ObjectLength = (object) => {
      var length = 0;
      for( var key in object ) {
          if( object.hasOwnProperty(key) ) {
              ++length;
          }
      }
      return length;
  }

  const allowOnlyNumbers = (e) => {
    var keynum;
    if(e) {// IE8 and earlier
       keynum = e.keyCode;
    } else if(e.which) { // IE9/Firefox/Chrome/Opera/Safari
       keynum = e.which;
    } else {
       keynum = 0;
    }

    if(keynum === 8 || keynum === 0 || keynum === 9) {
       return;
    }
    if(keynum < 46 || keynum > 57 || keynum === 47) {
       e.preventDefault();
    } // prevent all special characters except decimal point
  }

  function checkFileExists(filePath, callback) {
    const reader = new FileReader();
  
    // Set up an event listener for when the read operation is complete
    reader.onload = function () {
      // File exists
      callback(true);
    };
  
    // Set up an event listener for when the read operation encounters an error
    reader.onerror = function () {
      // File does not exist
      callback(false);
    };
  
    // Try to read the file asynchronously
    reader.readAsDataURL(filePath);
  }

  const GetScreenHeight = () => {
    const [browserHeight, setBrowserHeight] = useState(window.innerHeight);
  
    // Create a function to update the browser height when the window is resized
    const updateBrowserHeight = () => {
      setBrowserHeight(window.innerHeight);
    };
  
    // Add an event listener to the window when the component mounts
    useEffect(() => {
      window.addEventListener('resize', updateBrowserHeight);
  
      // Remove the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', updateBrowserHeight);
      };
    }, []);
  
    return browserHeight;
  }
  
  const seriesSearchLike = (jsonData, searchPattern) => {
    // Escape any special characters in the search pattern
    const escapedPattern = searchPattern.toString().replace(/[*+?^${}()|[\]\\]/g, "\\$&");
  
    // Replace SQL-like wildcards with their JavaScript equivalent
    const regexPattern = escapedPattern
      .replace(/%/g, ".*")
      .replace(/_/g, ".");
  
    // Create a regular expression for searching
    const regex = new RegExp(regexPattern, "i"); // "i" for case-insensitive search
  
    // Use Array.filter to find matching items
    const matches = jsonData.filter((item) => regex.test(item.number));
  
    return matches;
  }

  const animeSearchLike = (jsonData, searchPattern) => {
    // Escape any special characters in the search pattern
    const escapedPattern = searchPattern.toString().replace(/[*+?^${}()|[\]\\]/g, "\\$&");
  
    // Replace SQL-like wildcards with their JavaScript equivalent
    const regexPattern = escapedPattern
      .replace(/%/g, ".*")
      .replace(/_/g, ".");
  
    // Create a regular expression for searching
    const regex = new RegExp(regexPattern, "i"); // "i" for case-insensitive search
  
    // Use Array.filter to find matching items
    const matches = jsonData.filter((item) => regex.test(item.number));
  
    return matches;
  }

  const animeSearchNumberBetween = (jsonData, startNumber, endNumber) => {
    const filteredData = jsonData.filter(item => {
      return (startNumber === '' || item.number >= parseInt(startNumber, 10)) &&
             (endNumber === '' || item.number <= parseInt(endNumber, 10));
    });

    return filteredData;
  }

  const asianFilmsSearchLike = (jsonData, searchPattern) => {
    // Escape any special characters in the search pattern
    const escapedPattern = searchPattern.toString().replace(/[*+?^${}()|[\]\\]/g, "\\$&");

    // Replace SQL-like wildcards with their JavaScript equivalent
    const regexPattern = escapedPattern
      .replace(/%/g, ".*")
      .replace(/_/g, ".");

    // Create a regular expression for searching
    const regex = new RegExp(regexPattern, "i"); // "i" for case-insensitive search

    // Use Array.filter to find matching items
    const matches = jsonData.filter((item) => regex.test(item.episode));

    return matches;
  }

  const searchLike = (jsonData, searchPattern) => {
      // Escape any special characters in the search pattern
      const escapedPattern = searchPattern.toString().replace(/[*+?^${}()|[\]\\]/g, "\\$&");
    
      // Replace SQL-like wildcards with their JavaScript equivalent
      const regexPattern = escapedPattern
        .replace(/%/g, ".*")
        .replace(/_/g, ".");
    
      // Create a regular expression for searching
      const regex = new RegExp(regexPattern, "i"); // "i" for case-insensitive search
    
      // Use Array.filter to find matching items
      const matches = jsonData.filter((item) => regex.test(item.name));
    
      return matches;
  }

  const channelSearchLike = (jsonData, searchPattern) => {
    // Escape any special characters in the search pattern
    const escapedPattern = searchPattern.toString().replace(/[*+?^${}()|[\]\\]/g, "\\$&");
  
    // Replace SQL-like wildcards with their JavaScript equivalent
    const regexPattern = escapedPattern
      .replace(/%/g, ".*")
      .replace(/_/g, ".");
  
    // Create a regular expression for searching
    const regex = new RegExp(regexPattern, "i"); // "i" for case-insensitive search
  
    // Use Array.filter to find matching items
    const matches = jsonData.filter((item) => regex.test(item.name));
  
    return matches;
}

const parseM3U = (content) => {
  const lines = content.split('\n');
  const playlistItems = [];
  let currentItem = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('#EXTINF:')) {
      // Extract information from the #EXTINF line
      const [, duration, title] = line.match(/^#EXTINF:(.*),(.*)$/);
      let channelId=duration.split(" ")[1].replace("tvg-id=", "").slice(1).slice(0, -1);
      let channelLogo=duration.split(" ")[2].replace("tvg-logo=", "").slice(1).slice(0, -1);
      currentItem = { channelId, channelLogo, title };
    } else if (line && !line.startsWith('#')) {
      // Assume the line contains the media URL
      currentItem.url = line;
      playlistItems.push(currentItem);
      currentItem = {};
    }
  }

  return playlistItems;
}

const capitalizeString = (str) => {
  // Split the string into an array of words
  let words = str.toLowerCase().split(' ');

  // Capitalize the first letter of each word
  let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words back into a string
  let result = capitalizedWords.join(' ');

  console.log("capitalizedWords", capitalizedWords);

  return result;
}

const replaceUnderscoreToSpace = (str) => {
  return str.replace(/_/g, ' ');
}


export { shortenTextHeight, 
         streamDashboardBackButton, 
         moveToTop, 
         moveToClassName, 
         copyMovieLink, 
         useContainerDimensions, 
         getFileExtention, 
         destroyHls, 
         SeparateArrayByComma, 
         SeparateArrayButtons, 
         separatedSeasons, 
         ObjectLength,
         allowOnlyNumbers,
         checkFileExists,
         GetScreenHeight,
         seriesSearchLike,
         animeSearchLike,
         animeSearchNumberBetween,
         asianFilmsSearchLike,
         searchLike,
         channelSearchLike,
         parseM3U,
         capitalizeString,
         replaceUnderscoreToSpace };