function AddressBook(){
  this.contacts=[]
  this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact) {
  contact.id=this.assignId();
  this.contacts.push(contact);
}

Contact.prototype.addAddress = function(address) {
  address = []
  address.push(this.address);
  return address.join();
}


AddressBook.prototype.assignId = function(){
  this.currentId +=1;
  return this.currentId;
}
AddressBook.prototype.findContact = function(id){
  for (var i=0; i < this.contacts.length; i++){
    if (this.contacts[i]){
      if (this.contacts[i].id==id){
        return this.contacts[i];
      }
    }
  };
  return false;
}
AddressBook.prototype.deleteContact = function(id){
  for (var i=0; i<this.contacts.length; i++){
    if (this.contacts[i]){
      if (this.contacts[i].id==id){
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}
function Contact(firstName, lastName, phoneNumber, address, mailingAddress){
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = address,
  this.mailingAddress = mailingAddress
  }

function Address(personalEmailAddress, workEmailAddress){
  this.personalEmailAddress = personalEmailAddress,
  this.workEmailAddress = workEmailAddress
}

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
};
// User Interface Logic ---------
var addressBook = new AddressBook();
function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
    contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.address.personalEmailAddress + ", " + contact.address.workEmailAddress);
  $(".mailing-address").html(contact.mailingAddress);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners(){
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};
$(document).ready(function() {
    attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmailAddress = $("input#personal-email-address").val();
    var inputtedWorkEmailAddress = $("input#work-email-address").val();
    var inputtedMailingAddress = $("input#new-mailing-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#personal-email-address").val("");
    $("input#work-email-address").val("");
    $("input#new-mailing-address").val("");

    var newAddress = new Address(inputtedPersonalEmailAddress,inputtedWorkEmailAddress);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, newAddress, inputtedMailingAddress);
    addressBook.addContact(newContact);
    newContact.addAddress(newAddress);
    displayContactDetails(addressBook);

  })
})
