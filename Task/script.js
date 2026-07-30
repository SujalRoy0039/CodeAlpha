// ===========================
// CODEALPHA IMAGE GALLERY
// ===========================

// Select Elements

const galleryItems = document.querySelectorAll(".gallery-item");
const images = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const caption = document.querySelector(".caption");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const filterButtons = document.querySelectorAll(".filter-buttons button");

let currentImage = 0;


// ===========================
// OPEN LIGHTBOX
// ===========================

function showImage(index){

    currentImage = index;

    lightbox.classList.add("show");

    lightboxImage.src = images[index].src;

    lightboxImage.alt = images[index].alt;

    caption.innerHTML = images[index].alt;

}



// ===========================
// CLICK IMAGE
// ===========================

images.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        showImage(index);

    });

});



// ===========================
// CLOSE LIGHTBOX
// ===========================

closeBtn.addEventListener("click",()=>{

    lightbox.classList.remove("show");

});



// ===========================
// NEXT IMAGE
// ===========================

nextBtn.addEventListener("click",()=>{

    currentImage++;

    if(currentImage>=images.length){

        currentImage=0;

    }

    showImage(currentImage);

});



// ===========================
// PREVIOUS IMAGE
// ===========================

prevBtn.addEventListener("click",()=>{

    currentImage--;

    if(currentImage<0){

        currentImage=images.length-1;

    }

    showImage(currentImage);

});



// ===========================
// CLOSE ON BACKGROUND CLICK
// ===========================

lightbox.addEventListener("click",(event)=>{

    if(event.target===lightbox){

        lightbox.classList.remove("show");

    }

});




// ===========================
// KEYBOARD SUPPORT
// ===========================

document.addEventListener("keydown",(event)=>{

    if(!lightbox.classList.contains("show")){

        return;

    }

    if(event.key==="ArrowRight"){

        nextBtn.click();

    }

    if(event.key==="ArrowLeft"){

        prevBtn.click();

    }

    if(event.key==="Escape"){

        closeBtn.click();

    }

});




// ===========================
// FILTER IMAGES
// ===========================

filterButtons.forEach((button)=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach((btn)=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach((item)=>{

            if(filter==="all"){

                item.style.display="block";

            }

            else if(item.classList.contains(filter)){

                item.style.display="block";

            }

            else{

                item.style.display="none";

            }

        });

    });

});




// ===========================
// PRELOAD IMAGES
// ===========================

images.forEach((img)=>{

    const preload = new Image();

    preload.src = img.src;

});




// ===========================
// TOUCH SUPPORT (Mobile)
// ===========================

let startX = 0;

lightbox.addEventListener("touchstart",(event)=>{

    startX = event.touches[0].clientX;

});

lightbox.addEventListener("touchend",(event)=>{

    let endX = event.changedTouches[0].clientX;

    if(startX-endX>50){

        nextBtn.click();

    }

    if(endX-startX>50){

        prevBtn.click();

    }

});




// ===========================
// CONSOLE MESSAGE
// ===========================

console.log("CodeAlpha Image Gallery Loaded Successfully!");