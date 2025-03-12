'use client';

import React from 'react';

import { Banner } from '@/widgets/Banner';

import { Delivery } from './ui/Delivery';
import { Team } from './ui/Team';
import { Reviews } from './ui/Reviews';
import { MainBlock } from './ui/MainBlock';
import { MenusBlock } from './ui/MenusBlock';

const MainPage = () => {
    return (
        <>
            <MainBlock />

            <MenusBlock />

            <Banner />

            <Team />

            <Reviews />

            <Delivery />
        </>
    );
};

export default MainPage;
