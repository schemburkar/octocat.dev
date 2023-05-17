import Modal from "../../../components/modal";

const search = () => {
    return <>
    <Modal>
        <article className="mb-32">
            <input autoComplete='off' id="search-input" tabIndex={0} className={'text-center w-full mt-10 text-4xl leading-normal p-3 dark:bg-black border-gray-300 border rounded'} type={'text'} placeholder='Search Posts and Pages'  />
            <div className='text-right mt-2'><a href='#' className="underline hover:text-success duration-200 transition-colors">Close Search</a><span className='text-xs p-1 mx-1 border-gray-300 border rounded text-'>ESC</span></div>
        </article>
    </Modal>
    </>
}

export default search;