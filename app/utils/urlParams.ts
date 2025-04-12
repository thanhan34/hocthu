// Function to extract UTM parameters from URL
export const getUtmParams = () => {
  if (typeof window === 'undefined') {
    return {
      utmSource: '',
      utmCampaign: '',
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    utmSource: urlParams.get('utm_source') || '',
    utmCampaign: urlParams.get('utm_campaign') || '',
  };
};
