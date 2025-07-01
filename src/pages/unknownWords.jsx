
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import BASE_URL from '../config/api';

const UnknownWords = () => {
    const [unknown, setUnknown] = useState([])
    const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
    useEffect(() => {
        const fetchUnknownWords = async () => {
            const token = user.data.token;
            try {
                const res = await fetch(`${BASE_URL}/words/unknown-words`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(res);

                const data = await res.json()
                console.log(data)
                setUnknown(data)

            } catch (error) {
                console.error("Error fetching unknown words", error)
            }
        }
        fetchUnknownWords()
    }, [])
    console.log(unknown)

    return (
        <div className='p-4 lg:p-8 w-full '>

            {
                unknown.length === 0 ? (
                    <p className='text-center text-2xl font-bold'>You have not marked any words difficult yet</p>
                ) : (

                    < TableContainer >
                        <Table className="table-auto w-full border-separate" style={{ borderSpacing: 0 }}>
                            <Thead>
                                <Tr className='bg-[#0056D10D] dark:text-white'>
                                    <Th className='text-black text-center border-r p-3 dark:text-white'>S.N</Th>
                                    <Th className="text-black text-center border-r p-1 dark:text-white">Words</Th>
                                    <Th className="text-black text-center border-r p-1 dark:text-white ">Meaning</Th>
                                    <Th className="text-black text-center p-3 dark:text-white">Sentence</Th>
                                </Tr>
                            </Thead>
                            <Tbody className="space-y-4">
                                {unknown.map((word, index) =>


                                    <Tr className="bg-white shadow-md rounded-lg" key={index}>
                                        <Td className="p-4 text-left border-r">{index + 1}</Td>
                                        <Td className="p-4 text-left border-r">{word.word}</Td>
                                        <Td className="p-4 text-left">{word.meaning}</Td>
                                        <Td className="p-4 text-left">
                                            {word.sentence}
                                        </Td>
                                    </Tr>
                                )
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                )
            }
        </div >
    );
};

export default UnknownWords;
