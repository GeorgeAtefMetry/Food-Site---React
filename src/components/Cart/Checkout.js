import classes from './Checkout.module.css'
// I wil USE the Ref to get the values once the FORM SUBMITTED **** 
import { useRef, useState } from 'react'

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef() // Here After Creating Ref THEN we connect those to the FORM elements by ref{nameInputRef}
    
    
    const isEmpty = (value) => value.trim() === ''
    const isNotFiveChars = (value) => value.trim().length !== 5
    
    const confirmHandler = (event) => { 
        event.preventDefault()
                // Here We Submit the values
            const enteredName   = nameInputRef.current.value
            const enteredStreet = streetInputRef.current.value
            const enteredPostal = postalInputRef.current.value
            const enteredCity   = cityInputRef.current.value

            const enteredNameIsValid = !isEmpty(enteredName)
            const enteredStreetIsValid = !isEmpty(enteredStreet)
            const enteredCityIsValid = !isEmpty(enteredCity)
            const enteredPostalIsValid = !isNotFiveChars(enteredPostal)

            setFormInputsValidity({
                name: enteredNameIsValid,
                street: enteredStreetIsValid,
                postal: enteredPostalIsValid,
                city: enteredCityIsValid
            })

            const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid

            if(formIsValid){
                // If Form Is Not Valid we stop the process
                return                 
            }
            // Submit card data
            props.onConfirm({
                name: enteredName,
                street: enteredStreet,
                city: enteredCity,
                postal: enteredPostal
            })
    }
    
    return (
        <form onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id="name" ref={nameInputRef}></input>
                {!formInputsValidity.name && <p>Please Enter Valid Name</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Your Street</label>
                <input type='text' id="street" ref={streetInputRef}></input>
                {!formInputsValidity.street && <p>Please Enter Valid Name</p>}

            </div>
            <div className={`${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal</label>
                <input type='text' id="postal" ref={postalInputRef}></input>
                {!formInputsValidity.postal && <p>Please Enter Valid Name</p>}

            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id="city" ref={cityInputRef}></input>
                {!formInputsValidity.city && <p>Please Enter Valid Name</p>}

            </div>
            <div className={classes.actions}>
            <button>Confirm</button>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default Checkout