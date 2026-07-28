import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import './Register.scss'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
]

const INITIAL = {
  firstName: '', lastName: '', age: '', phone: '',
  email: '', address1: '', address2: '', city: '', state: '', zip: '',
}

function validateField(name, value) {
  const emailRegex = /^[a-zA-Z0-9!$%&'*+\-/=?^_`{|}~]+(?:[._-][a-zA-Z0-9!$%&'*+\-/=?^_`{|}~]+)*@([a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)$/;
  const phoneNumberRegex = /^\d{10}$/;
  const zipRegex = /^\d{5}(-\d{4})?$/;
  
  switch (name) {
    case 'firstName':
    case 'lastName':
    case 'address1':
    case 'city':
      return !value.trim() ? 'This field is required' : ''
    case 'state':
      return !value ? 'This field is required' : ''
    case 'age':
      return !value || isNaN(value) || value < 1 || value > 120 ? 'Enter a valid age' : ''
    case 'phone':
      return !phoneNumberRegex.test(value) ? 'Enter a valid phone number' : ''
    case 'email':
      return !emailRegex.test(value) ? 'Enter a valid email address' : ''
    case 'zip':
      return !zipRegex.test(value) ? 'Enter a valid zip code' : ''
    default:
      return ''
  }
}

export default function Register() {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const signIn = useAuthStore((s) => s.signIn)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    
    //To validate on field change
    // if (errors[name]) setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const err = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: err }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, validateField(k, v)])
    )
    if (Object.values(errs).some(Boolean)) return setErrors(errs)
    signIn({ firstName: fields.firstName, lastName: fields.lastName, email: fields.email })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="register-success">
        <div className="register-success__box">
          <h2>Account created successfully!</h2>
          <p>Welcome, {fields.firstName}. You can now explore the app.</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="register-success">
        <div className="register-success__box">
          <h2>You're already registered!</h2>
          <p>Welcome back, {user.firstName}. You already have an account.</p>
          <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </div>
    )
  }

  const f = (name, extraProps = {}) => ({
    name,
    value: fields[name],
    onChange: handleChange,
    onBlur: handleBlur,
    ...extraProps,
  })

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create your account</h1>
        <p className="register-card__sub">Fill in your details to register with Cartly.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="register-card__row">
            <div className="field">
              <label>First name</label>
              <input {...f('firstName')} placeholder="John" />
              {errors.firstName && <span className="field__error">{errors.firstName}</span>}
            </div>
            <div className="field">
              <label>Last name</label>
              <input {...f('lastName')} placeholder="Doe" />
              {errors.lastName && <span className="field__error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="register-card__row">
            <div className="field">
              <label>Age</label>
              <input {...f('age')} type="number" placeholder="28" />
              {errors.age && <span className="field__error">{errors.age}</span>}
            </div>
            <div className="field">
              <label>Phone</label>
              <input {...f('phone')} placeholder="+1 (555) 123-4567" />
              {errors.phone && <span className="field__error">{errors.phone}</span>}
            </div>
          </div>

          <div className="field">
            <label>Email</label>
            <input {...f('email')} type="email" placeholder="john.doe@example.com" />
            {errors.email && <span className="field__error">{errors.email}</span>}
          </div>

          <div className="register-card__section-label">ADDRESS</div>

          <div className="field">
            <label>Address line 1</label>
            <input {...f('address1')} placeholder="123 Market Street" />
            {errors.address1 && <span className="field__error">{errors.address1}</span>}
          </div>

          <div className="field">
            <label>Address line 2</label>
            <input {...f('address2')} placeholder="Apt 4B (optional)" />
          </div>

          <div className="register-card__row">
            <div className="field">
              <label>City</label>
              <input {...f('city')} placeholder="San Francisco" />
              {errors.city && <span className="field__error">{errors.city}</span>}
            </div>
            <div className="field">
              <label>State</label>
              <select {...f('state')}>
                <option value="">Select a state</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <span className="field__error">{errors.state}</span>}
            </div>
          </div>

          <div className="register-card__row register-card__row--half">
            <div className="field">
              <label>Zip code</label>
              <input {...f('zip')} placeholder="94103" />
              {errors.zip && <span className="field__error">{errors.zip}</span>}
            </div>
          </div>

          <div className="register-card__actions">
            <button type="submit" className="btn btn--primary">Register</button>
            <button type="button" className="btn btn--secondary" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
