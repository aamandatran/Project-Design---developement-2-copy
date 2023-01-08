
function click_filter_element(event) {
  filter_dom = event.currentTarget;
  filter_dom.classList.toggle("selected");

  update_programmes()

}


function create_filter_element(data) {
  const new_dom = document.createElement("li");
  new_dom.classList.add(data.class);
  data.parent.append(new_dom);
  new_dom.textContent = `${data.textContent}`;

  new_dom.addEventListener("click", click_filter_element);

  return new_dom;

}


function add_group_toggling(filter_container_dom) { }


function toggle_cities(event) { }


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters() {
  /*
      NO ARGUMENTS
  
      SIDE EFFECTS
       This function creates an HTML element for each country and city using two different arrays, CITIES and COUNTRIES. 
       Uses array_each to call the functions create_country and create_city for each element in array, with the element as argument.
  
      NO RETURN VALUE
    */

  function create_country(country) {
    /*
     ARGUMENTS
       country: object
 
     SIDE EFFECTS
      Creates a new dom-element with the tag "div"
      Gives the new dom-element classes "country" and "filter_container"
      Gives the new dom-element the id "country_" + country.id
      Appends the new dom-element to the element referenced as "document.querySelector("#country_filter > ul")"
      Sets the innerHTML of the element to include an h1 element with the name of the country and an unordered list (ul) element with the class "filter_list".
 
      Uses the function array_filter to filter through the array, CITIES, and find cities with the same ID as the country object.
      
      Uses array_each to call the function, create_city, on each of the cities in the filtered array. 
 
     NO RETURN VALUE
   */

    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city(city) {
    /*
ARGUMENTS
  city: object 

SIDE EFFECTS
 This function uses another function called create_filter_element to create a new DOM element for a city with specified parent element, class and textContent.

 The dataset.id property of the element is set to the id property of the city object.

NO RETURN VALUE
*/

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


function create_filters(parentSelector, array) {
  /*
      ARGUMENTS
        parentSelector: the parent reference to the HTML element where the created filter will be positioned.
        array: an array of objects, it could be either LEVELS, SUBJECTS or LANGUAGES from data.js and it depends on what filter you want to create.
  
      SIDE EFFECTS
        This function creates a new dom-element with class "selected" using the function create_filter_element.

        Uses array_each to call the function, create_filter, on each of the objects in the array. 

        The dataset.id property of the element is set to the id property of the city object.
  
      NO RETURN VALUE
    */

  function create_filter(object) {
    const dom = create_filter_element({
      parent: document.querySelector(parentSelector),
      class: "selected",
      textContent: object.name,
    });
    dom.dataset.id = object.id;
  }

  array_each(array, create_filter);
}


function create_programme(programme) {
  const dom = document.createElement("div");
  dom.classList.add("programme");
  dom.classList.add("selected");
  dom.id = "programme_" + programme.id;
  document.querySelector("#programmes > ul").append(dom);

  dom.innerHTML = `
  <div class="programme" id="top_info">
    <h1>${programme.name}</h1>
  </div>

  <div class="programme" id="bottom_info"></div>
  `;

  const university = array_find(UNIVERSITIES, test_function_1);
  function test_function_1(university) {
    if (programme.universityID === university.id) {
      return university.name;
    }
  }

  add_university(university);

  function add_university() {
    const temp = document.createElement("p");
    temp.classList.add("university");
    temp.textContent = `${university.name}`;
    document.querySelector(`#programme_${programme.id} #top_info`).append(temp);
  }

  const city = array_find(CITIES, test_function_2);
  function test_function_2(city) {
    if (university.cityID === city.id) {
      return city.name;
    }
  }
  const country = array_find(COUNTRIES, test_function_3);
  function test_function_3(country) {
    if (city.countryID === country.id) {
      return country.name;
    }
  }

  add_city(city, country);

  function add_city() {
    const temp = document.createElement("p");
    temp.classList.add("city");
    temp.textContent = `${city.name}, ${country.name} `;
    document.querySelector(`#programme_${programme.id} #top_info`).append(temp);


    const temp2 = document.createElement("p");
    temp2.classList.add("sun");
    temp2.textContent = `${city.name}, sun-index: ${city.sun} `;
    document.querySelector(`#programme_${programme.id} #bottom_info`).append(temp2);
  }

  const level = array_find(LEVELS, test_function_4);
  function test_function_4(level) {
    if (programme.levelID === level.id) {
      return level.name;
    }
  }
  const subject = array_find(SUBJECTS, test_function_5);
  function test_function_5(subject) {
    if (programme.subjectID === subject.id) {
      return subject.name;
    }
  }

  const language = array_find(LANGUAGES, test_function_6);
  function test_function_6(language) {
    if (programme.languageID === language.id) {
      return language.name;
    }
  }

  add_level_subject_language(level, subject, language);

  function add_level_subject_language() {
    const temp = document.createElement("p");
    temp.classList.add("level_subject_language");
    temp.textContent = `${level.name}, ${subject.name}, ${language.name} `;
    document.querySelector(`#programme_${programme.id} #top_info`).append(temp);
  }
}



function update_programmes() {
  document.querySelector("#programmes > ul").innerHTML = "";

  if (programmes.length === 0) {
    document.querySelector("#programmes > ul").textContent = "";
  } else {
    array_each(read_filters(programmes), create_programme);
  }
}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters() {

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
