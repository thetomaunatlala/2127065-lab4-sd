document.getElementById('myButton').addEventListener('click', function () {
    const countryName = document.getElementById('country').value.trim();  // Get value from input field

    if (countryName) {
      // URL with dynamic country name
      const url = `https://restcountries.com/v3.1/name/${countryName}`;

      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();  // Parse response as JSON
          } else {
            throw new Error("No data found for this country");
          }
        })
        .then((data) => {
          if (data && data[0]) {
            const country = data[0];  // First item in the response (country data)

            // Display country data
            document.getElementById('country_output').textContent = `Country: ${country.name.common}`;
            document.getElementById('population_output').textContent = `Population: ${country.population.toLocaleString()}`;
            document.getElementById('region_output').textContent = `Region: ${country.region}`;
            document.getElementById('flag_output').textContent = `Flag: ${country.flags.svg}`;

            // Display neighboring countries (if any)
            const borders = country.borders ? country.borders.join(', ') : 'None';
            document.getElementById('neighbour_output').textContent = `Neighbouring Countries: ${borders}`;
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was an error fetching the country data. Please try again.');
        });
    } else {
      alert('Please enter a country name.');
    }
  });