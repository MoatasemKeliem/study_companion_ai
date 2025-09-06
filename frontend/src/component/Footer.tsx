import "../style/footer.css"


const Footer = () => {
    return (
        <div>
            <div className="footer">
                <div>
                    <h3>INFO</h3>
                    <p>Products</p>
                    <p>FAQ</p>
                    <p>Contact Us</p>
                    <p>Admin</p>
                </div>
                <div>
                    <h3>Studies</h3>
                    <p>About Us</p>
                    <p>Terms of Service</p>
                    <p>Privacy</p>
                </div>
                <div>
                    <div className="formInput">
                        <form action="">
                            <p>Subscribe to our email newsletter</p>
                            <label htmlFor="">
                                <input type="text" placeholder='Your email' />
                                <button>SUBSCRIBE</button>
                            </label>
                        </form>
                    </div>
                    <h4>Follow us</h4>
                    <div>
                        <img src="https://static.vecteezy.com/system/resources/previews/042/127/197/non_2x/app-style-blue-facebook-logo-with-white-thick-border-and-long-shadow-on-a-transparent-background-free-png.png" alt="Facebook page" />
                        <img src="https://icon2.cleanpng.com/20240119/rp/transparent-x-logo-cross-design-black-and-white-photograph-sim-black-and-white-cross-with-letters-x-and-1710898892931.webp" alt="Twitter Page" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9V4NGi4jiLPvEtqcMH5AkQRSsyJ77UaJjDQ&s" alt="Instagram" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
