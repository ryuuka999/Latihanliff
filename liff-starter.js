/*************************
 *       LIFF Init       *
 ************************/
$(document).ready(function() {
    var myLiffId = "1655321868-V1w3BxM5";

    if(!myLiffId || myLiffId == '') {
        $('#liffLoginContent').addClass('hidden');
        $('#liffAppContent').addClass('hidden');
        $('#liffIdKosong').removeClass('hidden');
    } else {
        initializeLiff(myLiffId);
    }
});

//Inisialisasi
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId : myLiffId
        })
        .then(() => {
            initializeApp();
        })
        .catch((err) => {
            $('#errorCode').append(err);
            $('#liffAppContent').addClass('hidden');
            $('#liffIdErrorMessage').removeClass('hidden');
        });
}

function initializeApp() {
    if (!liff.isInClient()) {
        if (liff.isLoggedIn()) {
            $('#liffLoginButton').addClass('hidden');
            $('#liffLogoutButton').removeClass('hidden');
            $('#nextButton').html('<a href="Javascript:void(0)"> Next >></a>');
        } else {
            $('#liffLoginButton').removeClass('hidden');
            $('#liffLogoutButton').addClass('hidden');
        }
    } else {
        if (liff.isLoggedIn()) {
            $('#nextButton').html('<a href="Javascript:void(0)"> Next >></a>');
        }
    }
    
}



//BUTTON CONTROLLER

$(document).ready(function() {
    // LOGIN
    $('#liffLoginButton').on('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });

    // LOGOUT
    $('#liffLogoutButton').on('click', function() {
        if (liff.isLoggedIn() ) {
            liff.logout();
            window.location.reload();
        }
    });

    // EXTERNAL BROWSER
    $('#openExternal').on('click', function() {
        liff.openWindow({
            url : 'https://yansacatering.herokuapp.com/',
            external : true
        });
    }); 

    // NEXT
    $('#nextButton').on('click', function() {
        if (!liff.isLoggedIn() && !liff.isInClient()) {
            alert('Mohon Login Dahulu!');
        } else {
            $('#welcomewrapper').addClass('hidden');
            $('#homewrapper').removeClass('hidden');
            $('body').css('overflow','auto');
            
            const idToken = liff.getDecodedIDToken();
            
            $('#welcomeMsg #userName').html(idToken['name']);
        }
        
    });

    //Event Listener CLose Button
    $('#liffExitButton').on('click', function() {
        if (!liff.isInClient()) {
            alert('Anda membuka aplikasi lewat browser. Tekan OK untuk Close Window!!!');
            window.close();
        } else {
            liff.closeWindow();
        }
    });

    // Button Pesan Menu
    $('#pesanMenu').on('click', function() {
        if (!liff.isInClient()) {
            alert('Buka aplikasi lewat LINE');
        } else {
            liff
                .sendMessages([{
                    'type': 'text',
                    'text': "Berikut pesanan anda : \n\n" + getPesanan() + "\n\n "
                }])
                .then(function() {
                    window.alert('Message sent');
                })
                .catch(function(error) {
                    window.alert('Error sending message: ' + error);
                });
        }
    });
 });

// Fungsi untuk mengambil data dari Checkbox
function getPesanan() {
    var pesanan = [];

    $.each($('input[name="pesanan"]:checked'), function(index) {
        pesanan.push($(this).val());
    })

    return pesanan;
}
