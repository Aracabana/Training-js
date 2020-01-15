let europe = {
    area: 10.2,
    population: 694.5,
    domains: ['eu', 'su'],
    countries: [
        {
            name: 'Albania',
            capital: 'Tirana',
            languages: ['Albanian'],
            habitants: ['Albanian']
        },
        {
            name: 'Austria',
            capital: 'Vienna',
            languages: ['German'],
            habitants: ['Austrian']
        },
        {
            name: 'Belarus',
            capital: 'Minsk',
            languages: ['Belarussian'],
            habitants: ['Belorussian']
        },
        {
            name: 'Belgium',
            capital: 'Brussels',
            languages: ['Dutch', 'French', 'German'],
            habitants: ['Belgian']
        },
        {
            name: 'Bulgaria',
            capital: 'Sofia',
            languages: ['Bulgarian'],
            habitants: ['Bulgarian']
        },
        {
            name: 'Czech Republic',
            capital: 'Prague',
            languages: ['Czech'],
            habitants: ['Czech']
        },
        {
            name: 'Croatia',
            capital: 'Zagreb',
            languages: ['Croatian'],
            habitants: ['Croatian']
        },
        {
            name: 'Cyprus',
            capital: 'Nicosia',
            languages: ['Greek', 'Turkish'],
            habitants: ['Cypriot']
        },
        {
            name: 'Denmark',
            capital: 'Copenhagen',
            languages: ['Danish'],
            habitants: ['Danish', 'Dane']
        },
        {
            name: 'Estonia',
            capital: 'Tallinn',
            languages: ['Estonian'],
            habitants: ['Estonian']
        },
        {
            name: 'Finland',
            capital: 'Helsinki',
            languages: ['Finnish'],
            habitants: ['Finnish']
        },
        {
            name: 'France',
            capital: 'Paris',
            languages: ['French'],
            habitants: ['Frenchman', 'Frenchwoman']
        },
        {
            name: 'Germany',
            capital: 'Berlin',
            languages: ['German'],
            habitants: ['Germa']
        },
        {
            name: 'Greece',
            capital: 'Athens',
            languages: ['Greek'],
            habitants: ['Greek']
        },
        {
            name: 'Hungary',
            capital: 'Budapest',
            languages: ['Hungarian'],
            habitants: ['Hungarian']
        },
        {
            name: 'Iceland',
            capital: 'Reykjavik',
            languages: ['Icelandic'],
            habitants: ['Icelander']
        },
        {
            name: 'Ireland',
            capital: 'Dublin',
            languages: ['Irish', 'English'],
            habitants: ['Irish']
        },
        {
            name: 'Italy',
            capital: 'Rome',
            languages: ['Italian'],
            habitants: ['Italian']
        },
        {
            name: 'Latvia',
            capital: 'Riga',
            languages: ['Latvian'],
            habitants: ['Latvian']
        },
        {
            name: 'Lithuania',
            capital: 'Vilnius',
            languages: ['Lithuanian'],
            habitants: ['Lithuanian']
        },
        {
            name: 'Malta',
            capital: 'Valletta',
            languages: ['Maltese'],
            habitants: ['Maltese']
        },
        {
            name: 'Moldova',
            capital: 'Chisinau',
            languages: ['Moldavian'],
            habitants: ['Moldavian']
        },
        {
            name: 'Netherlands',
            capital: 'Amsterdam',
            languages: ['Dutch'],
            habitants: ['Dutchman', 'Dutchwoman']
        },
        {
            name: 'Norway',
            capital: 'Oslo',
            languages: ['Norwegian'],
            habitants: ['Norwegian']
        },
        {
            name: 'Poland',
            capital: 'Warsaw',
            languages: ['Polish'],
            habitants: ['Pole']
        },
        {
            name: 'Portugal',
            capital: 'Lisbon',
            languages: ['Portuguese'],
            habitants: ['Portuguese']
        },
        {
            name: 'Romania',
            capital: 'Bucharest',
            languages: ['Romanian'],
            habitants: ['Romanian']
        },
        {
            name: 'Russia',
            capital: 'Moscow',
            languages: ['Russian'],
            habitants: ['Russian']
        },
        {
            name: 'Serbia',
            capital: 'Belgrade',
            languages: ['Serbian'],
            habitants: ['Serbian']
        },
        {
            name: 'Slovakia',
            capital: 'Bratislava',
            languages: ['Slovakian'],
            habitants: ['Slovak', 'Slovakian']
        },
        {
            name: 'Slovenia',
            capital: 'Ljubljana',
            languages: ['Slovenian'],
            habitants: ['Slovenian', 'Slovene']
        },
        {
            name: 'Spain',
            capital: 'Madrid',
            languages: ['Spanish'],
            habitants: ['Spaniard']
        },
        {
            name: 'Sweden',
            capital: 'Stockholm',
            languages: ['Swedish'],
            habitants: ['Swede']
        },
        {
            name: 'Switzerland',
            capital: 'Bern',
            languages: ['German', 'French', 'Italian', 'Romansh'],
            habitants: ['Swiss']
        },
        {
            name: 'Ukraine',
            capital: 'Kiev',
            languages: ['Ukrainian'],
            habitants: ['Ukrainian']
        }
    ],
    printAbout: function() {
        this.countries.forEach(function(item) {
            let p = document.createElement('p');
            p.textContent = item.capital + ' is the capital of ' + item.name;
            let div = document.getElementById('test');
            div.append(p);
        });
    }
};

europe.printAbout();
