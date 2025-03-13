import React from 'react'
import Team_Members from './Team_Members';

function Members() {
  const team_members =[
    {
        Name: 'Jalish Bukhtawar',
        College: 'Heritage Institute of Technology',
        University: 'Jadavpur University'
    },

    {
        Name: 'Sahil Hasan Lashkar',
        College: 'JIS College of Engineering',
        University: 'Makaut University'
    },

    {
        Name: 'Rajib Addya',
        College: 'Syamaprasad College',
        University: 'Calcutta University'
    },

    {
        Name: 'Sushrita Biswas',
        College: 'Asutosh College',
        University: 'Calcutta University'
    }
  ];
  return (
    <div
    className='team-members'>
        {team_members.map((member, index)=> (
            <Team_Members key={index} Name = {member.Name} College = {member.College} University = {member.University}/>
        ))}
    </div>
  );
}

export default Members