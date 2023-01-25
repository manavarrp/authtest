// RegisterScreen.js
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import { registerUser } from '../features/user/authActions';

const RegisterScreen = () => {
  const [hasPromo, setHasPromo] = useState(false);
   
  const onChangeCheckBox = (e) => {
        setHasPromo(e.target.checked);
      };

    const [promo, setPromo] = useState("");
    const onChangePromo = (e) => {
        setPromo(e.target.value);
      };  
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate('/login');
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/user-profile');
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.cpassword) {
      alert('Password mismatch');
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className="form-group">
        <label htmlFor="FirstName">Primer Nombre</label>
        <input
          type="text"
          className="form-input"
          {...register('FirstName')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="SecondName">Segundo Nombre</label>
        <input
          type="text"
          className="form-input"
          {...register('SecondName')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="LastFirstName">Apellido Materno</label>
        <input
          type="text"
          className="form-input"
          {...register('LastFirstName')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="LastSecondName">Apellido Paterno</label>
        <input
          type="text"
          className="form-input"
          {...register('LastSecondName')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          className="form-input"
          {...register('phone')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register('email')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="curp">Contraseña</label>
        <input
          type="text"
          className="form-input"
          {...register('curp')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpassword">Confirmar contraseña</label>
        <input
          type="password"
          className="form-input"
          {...register('cpassword')}
          required
        />
      </div>
      <div className="flex items-center gap-3 text-gray"> 
               <input type="checkbox" checked={hasPromo} onChange={onChangeCheckBox} />
                <span>
                  ¿Tienes número de convenio con tu empresa?       
              </span>
            
              </div>
          
              {hasPromo && (
               
              <input
               type="text"
               className="form-input"
               {...register('curp')}
                required  
               value={promo} 
                onChange={onChangePromo} 
              />
              )}

      <button type="submit" className="button" disabled={loading}>
        {loading ? 'cargando' : 'Register'}
      </button>
    </form>
  );
};
export default RegisterScreen;
