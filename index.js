"use strict";

create_filters("#level_filter > ul", LEVELS);
create_filters("#subject_filter > ul", SUBJECTS);
create_filters("#language_filter > ul", LANGUAGES);
create_countries_cities_filters();

document.querySelector("#search_field button").addEventListener("click", update_programmes);

update_programmes();


