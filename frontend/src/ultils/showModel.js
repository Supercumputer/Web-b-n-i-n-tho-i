import Swal from 'sweetalert2';
const shoModel = (title, text, type, btn = false) => {
    return Swal({
        title: title,
        text: text || 'An error occurred. Please try again later.',
        type: type,
        showCancelButton: btn,
    });
};

export { shoModel };
