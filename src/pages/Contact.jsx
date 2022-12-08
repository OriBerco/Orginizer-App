import { Button } from "react-bootstrap";

export default function Contact() {
  return (
    <>
      <h2>Contact Us</h2>
      <div id="contact">
        <div className="centerContent">
          <div id="registerArea">
            <h2>Get in touch!</h2>
            <div>
              <form>
                <input type="text" id="fName" placeholder="First Name" />
                <br />

                <input type="text" id="lName" placeholder="Last Name" />
                <br />

                <input type="tel" id="phone" placeholder="Phone Number" />
                <br />

                <input type="email" id="email" placeholder="Email" />
                <br />

                <textarea
                  name="texti"
                  id=""
                  cols="20"
                  rows="2"
                  placeholder="Tell us more.."
                ></textarea>

                <div>
                  {" "}
                  <Button
                    type="button"
                    onClick={() => alert("Thank you, we'll be in touch!")}
                  >
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <h5>Phone: +972-50-323-2255</h5>
          <h5>Address: Blag Blig Luksinton Rd</h5>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221064.61359299612!2d-89.88256344999999!3d30.032996449999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a454b2118265%3A0xdb065be85e22d3b4!2z16DXmdeVINeQ15XXqNec15nXoNehLCDXnNeV15DXmdeW15nXkNeg15QsINeQ16jXpteV16og15TXkdeo15nXqg!5e0!3m2!1siw!2sil!4v1656685682582!5m2!1siw!2sil"
            width="350"
            height="250"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
