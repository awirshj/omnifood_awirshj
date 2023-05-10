div figure
img-box img %
address
testimonial figure
ion icon

# <form class="cta-form" name="sign-up" netlify>

                <div>
                  <label for="full-name">Full Name</label>
                  <input
                    id="full-name"
                    type="text"
                    placeholder="John Smith"
                    name="full-name"
                    required
                  />
                </div>

                <div>
                  <label for="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="me@example.com"
                    name="email"
                    required
                  />
                </div>

                <div>
                  <label for="select-where">Where did you hear from us?</label>
                  <select id="select-where" name="select-where" required>
                    <option value="">Please choose one option:</option>
                    <option value="friends">Friends and family</option>
                    <option value="youtube">YouTube video</option>
                    <option value="podcast">Podcast</option>
                    <option value="ad">Facebook ad</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <button class="btn btn--form">Sign up now</button>

                <!-- <input type="checkbox" />
                <input type="number" /> -->
              </form>

# <div

              class="cta-img-box"
              role="img"
              aria-label="Woman enjoying food"
            ></div>

# #cta #testimonial #section

a in nav , button in body

# // Fixing flexbox gap property missing in some Safari versions

function checkFlexGap() {
var flex = document.createElement("div");
flex.style.display = "flex";
flex.style.flexDirection = "column";
flex.style.rowGap = "1px";

flex.appendChild(document.createElement("div"));
flex.appendChild(document.createElement("div"));

document.body.appendChild(flex);
var isSupported = flex.scrollHeight === 1;
flex.parentNode.removeChild(flex);
console.log(isSupported);

if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
