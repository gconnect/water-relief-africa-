let head  = document.getElementsByTagName('head')[0];
let link  = document.createElement('link');
let meta  = document.createElement('meta');

link.rel  = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
link.href = 'css/water.css';
meta.name = 'viewport'
meta.content = 'width=device-width, initial-scale=1.0'
head.appendChild(link);
head.appendChild(meta);


document.getElementById('sidebar').innerHTML=
`<div class='sidebar-menu'>
    <a 'href=javascript:void(0);' class='toggle-icon' onclick='myFunction()'>
        <i class='fa fa-bars' menu-icon></i>
    </a>
    <ul class='sidebar-applink'>
        <li><a href='index.html' class='logo'>Home</a></li>
        <li><a href='about.html' class='logo'>About</a></li>
        <li><a href='volunteer.html' class='logo'>Get involved</a></li>
        <li><a href='projects.html' class='logo'>Projects</a></li>
        <li><a href='board-members.html' class='logo'>Our Team</a></li>
        <li><a href='contact-us.html' class='logo'>Contact us</a></li>
    </ul>
  
</div>`

document.getElementById('header').innerHTML=
`<div class='menu'>
    <a 'href=javascript:void(0);' class='toggle-icon' onclick='myFunction()'>
        <i class='fa fa-bars' menu-icon></i>
    </a>
    <a href='index.html' class="brand-name">
        <img src = "images/WaterRelief.png" class='wr-logo' alt "water relief">
    </a>
    <ul class='my-menu'>
        <li><a href='about.html' class='logo'>About</a></li>
        <li><a href='volunteer.html' class='logo'>Get involved</a></li>
        <li><a href='projects.html' class='logo'>Projects</a></li>
        <li><a href='board-members.html' class='logo'>Our Team</a></li>
        <li><a href='contact-us.html' class='logo'>Contact us</a></li>
    </ul>
    <button onclick="payWithPaystack()" class='donate'>Donate</button>
    
</div>`

document.getElementById('footer').innerHTML =
`<div class="footer">
        <p class="icon-footer" id= "mylinks">Water Relief Africa</p>
        <div class="footer-menu">
            <a class ="footer-link" href="index.html">Home</a>
            <a class ="footer-link" href="about.html">About </a>
            <a class ="footer-link" href = "volunteer.html">Get Involved</a>
            <a class ="footer-link" href = "projects.html">Projects</a>
            <a class ="footer-link" href ="board-members.html">Our Team</a></li>
            <a class ="footer-link" href ="contact-us.html">Contact us</a>
        </div>
        <p class="copy">All rights reserved &copy; 2018</p>
        <div class="socials">
            <a href="https://www.facebook.com/Waterreliefafrica" i class="fa fa-facebook fa-lg social-icons"></i></a>
            <a a href="https://www.twitter.com/Waterreliefafrica" i class="fa fa-twitter fa-lg social-icons"></i></a>
            <a a href="tel:2347051120971" i class="fa fa-whatsapp fa-lg social-icons"></i></a>
        </div>`

                function myFunction() {
                    var x = document.getElementById("sidebar");
                    if (x.style.display === "block") {
                        x.style.display = "none";
                    } else {
                        x.style.display = "block";
                    }
                }


                // paystack implementation
                function payWithPaystack() {

                    var handler = PaystackPop.setup({ 
                        key: 'pk_test_479d4a9451d25c587841102c429f928f5fbb594f', //put your public key here
                        email: 'waterreliefafrica@gmail.com', //put your customer's email here
                        amount: 370000, //amount the customer is supposed to pay
                        metadata: {
                            custom_fields: [
                                {
                                    display_name: "Mobile Number",
                                    variable_name: "mobile_number",
                                    value: "+2348012345678" //customer's mobile number
                                }
                            ]
                        },
                        callback: function (response) {
                            //after the transaction have been completed
                            //make post call  to the server with to verify payment 
                            //using transaction reference as post data
                            $.post("verify.php", {reference:response.reference}, function(status){
                                if(status == "success")
                                    //successful transaction
                                    alert('Transaction was successful');
                                else
                                    //transaction failed
                                    alert(response);
                            });
                        },
                        onClose: function () {
                            //when the user close the payment modal
                            alert('Transaction cancelled');
                        }
                    });
                    handler.openIframe(); //open the paystack's payment modal
                }