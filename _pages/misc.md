---
layout: page
permalink: /misc/
title: Misc
nav: true
nav_order: 3
---

<div class="misc-description">
  <p>In my spare time, I enjoy traveling, snowboarding, basketball, and photographing. Here you'll find a collection of photos that capture moments from my life and travels. All photos are taken by Fujifilm X-T5.</p>
</div>

<!-- Modal for full-size images -->
<div id="imageModal" class="modal">
  <span class="close">&times;</span>
  <img class="modal-content" id="modalImage">
</div>

<div class="photo-collections">
  <div class="photo-collection">
    <h3>Laguna Beach, CA</h3>
    <div class="photo-frame">
      <img src="{{ '/assets/img/misc_photos/laguna1.jpg' | relative_url }}" alt="Nature photo 1" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/laguna2.jpg' | relative_url }}" alt="Nature photo 2" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/laguna3.jpg' | relative_url }}" alt="Nature photo 3" onclick="openModal(this)">
    </div>
  </div>
  <div class="photo-collection">
    <h3>Fred W. Symmes Chapel, SC</h3>
    <div class="photo-frame">
      <img src="{{ '/assets/img/misc_photos/crossing1.jpg' | relative_url }}" alt="Nature photo 1" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/crossing2.jpg' | relative_url }}" alt="Nature photo 2" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/crossing3.jpg' | relative_url }}" alt="Nature photo 2" onclick="openModal(this)">
    </div>
  </div>
  <div class="photo-collection">
    <h3>Gibbs Garden, GA</h3>
    <div class="photo-frame">
      <img src="{{ '/assets/img/misc_photos/garden1.jpg' | relative_url }}" alt="Nature photo 1" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/garden2.jpg' | relative_url }}" alt="Nature photo 2" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/garden3.jpg' | relative_url }}" alt="Nature photo 3" onclick="openModal(this)">
    </div>
  </div>
  <div class="photo-collection">
    <h3>Cars</h3>
    <div class="photo-frame">
      <img src="{{ '/assets/img/misc_photos/car1.jpg' | relative_url }}" alt="Nature photo 1" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/car2.jpg' | relative_url }}" alt="Nature photo 2" onclick="openModal(this)">
      <img src="{{ '/assets/img/misc_photos/car3.jpg' | relative_url }}" alt="Nature photo 3" onclick="openModal(this)">
    </div>
  </div>
</div>

<script>
// Get the modal
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");

// Function to open modal
function openModal(img) {
  modal.style.display = "block";
  modalImg.src = img.src;
  
  // Create a new image to get the natural dimensions
  var tempImg = new Image();
  tempImg.src = img.src;
  
  tempImg.onload = function() {
    // Calculate the maximum dimensions while maintaining aspect ratio
    var maxWidth = window.innerWidth * 0.9;  // 90% of window width
    var maxHeight = window.innerHeight * 0.9;  // 90% of window height
    
    var width = tempImg.naturalWidth;
    var height = tempImg.naturalHeight;
    
    // Calculate scaling factor
    var scale = Math.min(maxWidth / width, maxHeight / height);
    
    // Set the modal image dimensions
    modalImg.style.width = (width * scale) + 'px';
    modalImg.style.height = (height * scale) + 'px';
  };
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>

<!-- Content for the Miscellaneous page will go here -->