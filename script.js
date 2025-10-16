 async function getweather(city) {
  const url='https://api.openmeteo.com/v1/forecast?latitude=28.61&longitude=77.23&current_weather=true';
  try{
    const reponse=await fetch(url);
    if(!reponse.ok) throw new Error('Network response was not ok');
    const data=await reponse.json();
    console.log('Weather data for',city,':',data);
  } catch(error) {
    console.error('Error fetching weeather:',error);

  }
    }
  getweather('New Delhi');
  
  
 