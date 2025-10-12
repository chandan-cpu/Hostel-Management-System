import React from 'react'

const OverDuesClear = ({onClose,id}) => {
    console.log("Student Details",id);
  return (
    <div className="flex justify-center mt-10">
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30  bg-opacity-50 flex justify-center items-center z-50">
        OverDuesClear
         <button
              onClick={() => onClose()}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
             <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              Hello OverDuesClear
            </h2>
            <div className=''>
                <div>
                    {/* <p>Name: {student?.dues}</p> */}
                </div>

            </div>


        </div>
    </div>
  )
}

export default OverDuesClear;
