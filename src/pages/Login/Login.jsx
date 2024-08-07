
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
 import Swal from 'sweetalert2';
import Social from "../Social/Social"
import { Helmet } from 'react-helmet-async';


const Login = () => {

    const {signIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    

  const handleLogin = e =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);

    signIn(email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "LoggedIn Successfully",
        showConfirmButton: false,
        timer: 1500
      });

      navigate(from, {replace: true})

    });
    
  }



  return (
    <div>
          <Helmet>
        <title>Medi corner | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-purple-200 ">
        <div className="hero-content flex-col">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold text-black">Login now!</h1>
          </div>
          <div className="card  md:w-[400px]">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <input
                 className="btn bg-purple-700 text-white"
                  type="submit"
                   value="Login" />
              </div>
            </form>
            <p className='text-center font-semibold text-black'>New here? <Link to='/signUp'>  <span className='text-purple-700 font-bold text-base'>Sign Up</span> </Link></p>
            <p className='text-center text-black'>or,</p>
            <div className=' text-center text-black'>
              <Social></Social>
           
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
