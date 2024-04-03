import { Button } from "@mui/material";
import { useState, useEffect, useRef, Fragment } from "react";
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
  if (element.length > 0) {
  element[0].scrollIntoView({ behavior: "smooth" });
  }
};

const moveToTop = () => {
    const element = document.getElementsByClassName('top');
    if (element.length > 0) {
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

  const getWindowSize = () => {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  const useScreenDimensions = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
      function handleWindowResize() {
        setWindowSize(getWindowSize());
      }
  
      window.addEventListener('resize', handleWindowResize);
  
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    return {
      pxWidth: windowSize.innerWidth,
      pxHeight: windowSize.innerHeight
    }

  }

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

  const SeparateArrayByCircularSpan = ({ type, data, link }) => {
    return (
      <>
        {data?.map((item, i) => {
          return (
            <Fragment key={i}>
              {type === "site_link" ?
                <Link className='text-link-without-underline' title={item} to={`${link}${item}`} style={{ cursor: 'pointer', marginRight: '5px' }}>
                  <Button variant="contained" size="small" style={{ backgroundColor: 'rgba(105, 105, 105, 0.4)', paddingBlock: '5px', paddingInline: '10px', borderRadius: '15px', marginBottom: '5px', color: '#FBFBFB' }}>
                    {item}
                  </Button>
                </Link>
              : type === "google_link" ? 
                <a className='text-link-without-underline' href={`${link}${item}`} alt={item} title={item} rel='noreferrer' target='_blank' style={{ cursor: 'pointer', marginRight: '5px' }}>
                  <Button variant="contained" size="small" style={{ backgroundColor: 'rgba(105, 105, 105, 0.4)', paddingBlock: '5px', paddingInline: '10px', borderRadius: '15px', marginBottom: '5px', color: '#FBFBFB' }}>
                    {item}
                  </Button>
                </a>
              : 
                <Button variant="contained" size="small" style={{ backgroundColor: 'rgba(105, 105, 105, 0.4)', paddingBlock: '5px', paddingInline: '10px', borderRadius: '15px', marginBottom: '5px', color: '#FBFBFB', marginRight: '5px' }}>
                  {item}
                </Button>}
            </Fragment>
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

  // console.log("capitalizedWords", capitalizedWords);

  return result;
}

const replaceUnderscoreToSpace = (str) => {
  return str.replace(/_/g, ' ');
}

const convertMinutesToHoursAndMinutes = (minutes) => {
  if (!minutes) return '';
  minutes = typeof minutes === 'number' && !isNaN(minutes) ? minutes : parseFloat(minutes);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours + "h " + remainingMinutes + "m";
}

const convertSecondsToHoursAndMinutes = (seconds) => {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);

  var result = '';
  if (hours > 0) {
      result += `${hours} h `;
  }
  if (minutes > 0 || hours === 0) {
      result += `${Math.round(minutes)} m`;
  }

  return result;
}

const secondsToHMS = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const secondsToMinutes = (seconds) => {
  return seconds / 60;
}

const randomizeArray = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

const getNumberSuffix = (num) => {
  // Handle special cases for 11, 12, and 13
  if (num % 100 >= 11 && num % 100 <= 13) {
      return `${num}th`;
  }

  // Regular suffix logic for other numbers
  switch (num % 10) {
      case 1:
          return `${num}st`;
      case 2:
          return `${num}nd`;
      case 3:
          return `${num}rd`;
      default:
          return `${num}th`;
  }
}

const getLanguageName = (langCode, increment = 0) => {
  const languageCodes = require('./Data/languages.json');
  const regex = /^[a-zA-Z]{3}-\d+$/;
  if (regex.test(langCode)) {
    const strParts = langCode.split('-');
    return languageCodes[strParts[0]] ? `${languageCodes[strParts[0]].full} [${strParts[1]}]` : `${langCode}`;
  } else {
    return langCode;
  }
  // I decrypt the encrypted language name soon
}

const isJSONString = (str) => {
  return /^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@')
    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
}

const getAllSavedCookiesMedia = () => {
  const cookiesArray = document.cookie ? document.cookie.split(';') : [];
  const cookiesObject = [];
  cookiesArray.forEach(cookie => {
    const [name, value] = cookie.split('=');
    if (isJSONString(value.trim())) {
        const arrData = JSON.parse(value.trim());
        if (arrData?.mediaId && arrData?.title && arrData?.episodeId) {
            cookiesObject.push(JSON.parse(value.trim()));
        }
    }
  });
  return cookiesObject;
};

export { shortenTextHeight, 
         streamDashboardBackButton, 
         moveToTop, 
         moveToClassName, 
         copyMovieLink, 
         useContainerDimensions, 
         getWindowSize, 
         useScreenDimensions, 
         getFileExtention, 
         destroyHls, 
         SeparateArrayByComma, 
         SeparateArrayByCircularSpan, 
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
         replaceUnderscoreToSpace, 
         convertMinutesToHoursAndMinutes, 
         convertSecondsToHoursAndMinutes, 
         secondsToHMS, 
         secondsToMinutes, 
         randomizeArray, 
         getNumberSuffix, 
         getLanguageName, 
         isJSONString,
         getAllSavedCookiesMedia };