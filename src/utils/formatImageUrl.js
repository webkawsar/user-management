const formatImageUrl = (image) => {
  let imageUrl = "";
  if (image?.data?.attributes) {
    if (image?.data?.attributes?.formats?.large?.url) {
      imageUrl = image?.data?.attributes?.formats?.large?.url;
    } else if (image?.data?.attributes?.formats?.medium?.url) {
      imageUrl = image?.data?.attributes?.formats?.medium?.url;
    } else if (image?.data?.attributes?.formats?.small?.url) {
      imageUrl = image?.data?.attributes?.formats?.small?.url;
    } else {
      imageUrl = image?.data?.attributes?.formats?.thumbnail?.url;
    }
  } else {
    if (image?.formats?.large?.url) {
      imageUrl = image?.formats?.large?.url;
    } else if (image?.formats?.medium?.url) {
      imageUrl = image?.formats?.medium?.url;
    } else if (image?.formats?.small?.url) {
      imageUrl = image?.formats?.small?.url;
    } else {
      imageUrl = image?.formats?.thumbnail?.url;
    }
  }

  return imageUrl;
};

export default formatImageUrl;
