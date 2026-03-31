import './TodoForm.css'
interface Props {
    addTodo: (text: string) => void;
    updateTodo: (id: number, text: string) => void;
    editingId: number | null;
    editingText: string;
    setEditingText: (text: string) => void;
    setEditingId: (id: number | null) => void;
}
const TodoForm = ({ addTodo, updateTodo, editingId, editingText, setEditingText, setEditingId }: Props) => {
    const capitalize  = (str:string)=>(
        str.charAt(0).toUpperCase()+str.slice(1)
    );
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!editingText.trim()){
            alert('Tên Công Việc Không Được Bỏ Trống !')
            return;
        } 

        if (editingId !== null) {
            updateTodo(editingId, editingText);
            setEditingId(null);
        } else {
            addTodo(capitalize(editingText));
        }

        setEditingText("");
    };
    return (
        <div className=" todo-form">
            <form onSubmit={handleSubmit} >
                <div className="form-group todo-form-group">
                    <label className='todo-form-title'>Todo Name</label>
                    <input
                    className='todo-form-input'
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                <button type="submit" className={`btn todo-form-action  ${editingId !== null ? "btn-primary" : "btn-success"}`}>
                    {editingId !== null ? "Update" : "Add"}
                </button>
                </div>
            </form>
        </div>
    )
}
export default TodoForm;                                                                                                