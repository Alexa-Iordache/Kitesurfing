import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalValabilityPassword(props) {

    // input passwords are sent as props
    const password = props.password;
    const password2 = props.password2;
    const email = props.email;
    const [open, setOpen] = React.useState(true);

    // if the user clicks on the window, the modal will dissapear
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* if both of the password innputs are completed and they are different */}
            {(password !== password2 && password !== '' && password2 !== '' && email !== '')
                ?   
                // the modal will pop up
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        The second password does not match the first password. Please repeat the process.
                    </Box>
                </Modal>
                : null
            }
        </div>
    );
}
