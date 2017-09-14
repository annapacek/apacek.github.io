// definicja funkcji ajax
function ajax ( ajaxOptions ) {
    
//  parametry połączenia i typu
    var options = {
        type: ajaxOptions.type || 'POST',
        url: ajaxOptions.url || '',
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || 'text'
    };
    
//  funkcja sprawdzająca status połączenia - czy połączenie się udało, funkcja za parametr przyjmuje obiekt XMLHttpRequest
    function httpSuccess( httpRequest ) {
        try { // i teraz kod programu, ktory moze generowac wyjatki
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch (e) {
            return false;
        }
    }
    
//  1. utworzenie obiektu XMLHttpRequest
    var httpReq = new XMLHttpRequest();
    
// 2. otwarcie połączenia na obiekcie
    httpReq.open(options.type, options.url, true);
    
// 3. sprawdź stan dokumentu - onreadystatechange (0m1,2,3,4 z prezentacji)
    httpReq.onreadystatechange = function () {
        
//  sprawdzamy czy dane są zwrócona i gotowe do użycia
        if(httpReq.readyState == 4) {
//      sprawdzamy status połączenia
            if ( httpSuccess(httpReq) ) {
                var returnData = (options.dataType == 'XML')?
                httpReq.responseXML : httpReq.responseText;
                
//          jesli wszystko ok, to funkcja on Success
                options.onSuccess( returnData );
                
//          zeruj obiekt zeby nie wysyłać żadań do serwera i nie utzymywac połączenia
                httpReq = null;
                
//           else jezeli blad wykonaj funkcje onError
            } else {
                options.onError( httpReq.statusText );
            }
        }
    }

// wysyłamy obrobione zadanie do serwera
    httpReq.send();
}

//koniec definicji funkcji ajax


var buttonType = document.getElementById('button-click');
var daneProgramisty = document.getElementById('dane-programisty');

function pobierzDane(event) {
    event.preventDefault();
    
    ajax({ type: 'GET',
    url: 'https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php',
    
    //  jezeli polaczenie zwraca blad
        onError: function (msg) {
            console.log(msg);
        },

    //  jezeli polaczenie nawiazane i gotowe do uzycia
        onSuccess: function (response) {

            var jsonObj = JSON.parse(response);

            var name = document.createElement('p');
            var surname = document.createElement('p');
            var profesion = document.createElement('p');
            var company = document.createElement('p');

            name.innerHTML = "Imie: " + jsonObj.imie;
            surname.innerHTML = "Nazwisko: " + jsonObj.nazwisko;
            profesion.innerHTML = "Zawod: " + jsonObj.zawod;
            company.innerHTML = "Firma: " + jsonObj.firma;

            daneProgramisty.appendChild(name);  
            daneProgramisty.appendChild(surname); 
            daneProgramisty.appendChild(profesion); 
            daneProgramisty.appendChild(company);   
        }   
    })  
}

buttonType.onclick = pobierzDane;




