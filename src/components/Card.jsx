import React from 'react';

const Card = ({ name, description, image }) => {

    return (
        <div className="rounded-xl border border-gray-200 p-10">
            <img className="rounded-lg w-full h-[200px] object-contain" src={image} alt={name} />
            <div className="flex flex-col gap-5 py-5">
                <h2 className="font-medium text-xl">{name}</h2>
                <p className="font-normal text-gray-500 text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
