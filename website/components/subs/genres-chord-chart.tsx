'use client'

import { ResponsiveChord } from '@nivo/chord'
import data from '@/data/genres_data.json';

export function GenresChordChart() {
    return (
        <div>
            <div className="w-full h-screen">
                <ResponsiveChord
                    data={data.data}
                    keys={data.keys}
                    margin={{ top: 120, right: 300, bottom: 120, left: 100 }}
                    valueFormat=".2f"
                    padAngle={0.006}
                    innerRadiusRatio={0.86}
                    inactiveArcOpacity={0.4}
                    arcBorderWidth={0}
                    arcBorderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.4
                            ]
                        ]
                    }}
                    activeRibbonOpacity={0.75}
                    inactiveRibbonOpacity={0}
                    ribbonBorderWidth={0}
                    ribbonBorderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'brighter',
                                0.4
                            ]
                        ]
                    }}
                    labelOffset={9}
                    labelRotation={-90}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'brighter',
                                0.8
                            ]
                        ]
                    }}
                    colors={[
                        '#E54D2E', // YouTube Red
                        '#D3D3D3', // Light Grey
                        '#FFFFFF', // White
                        '#A9A9A9', // Dark Grey
                        '#F8B7A0', // Light Red
                    ]
                    }
                    legends={[
                        {
                            anchor: 'right',
                            direction: 'column',
                            justify: false,
                            translateX: -20,
                            translateY: 0,
                            itemWidth: 120,
                            itemHeight: 15,
                            itemsSpacing: 0,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            symbolSize: 12,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                    theme={{
                        labels: {
                            text: {
                                fontSize: 16,
                            },
                        },
                        legends: {
                            text: {
                                fontSize: 15,
                            },
                        },
                        tooltip: {
                            container: {
                                background: "#000000",
                                color: "#ffffff",
                                fontSize: 16
                            },
                        },
                    }}
                />
            </div>
            <div className="w-full text-center px-32 py-8 text-lg text-gray-300">
                <p className="text-justify mb-4">
                    Looking at the chord chart, we can observe that some genres regularly appear together, while others are rarely or never paired.
                    This tells us about the potential connections between games and communities.
                    For example, if you're passionate about Adventure games, you will often find that these games are linked to genres like RPG, Platform, or Shooter.
                    Thus, as an Adventure gamer, you are likely to be part of a broad community that spans multiple genres, offering diverse experiences and interactions.
                </p>
                <p className="text-justify mb-4">
                    On the other hand, genres like Sport, Card & Board Games, and MOBA tend to stay within their own circles.
                    These genres are less likely to be paired with others, which means that players of these games may find themselves
                    more isolated, focusing on their specific niche.
                    MOBA (Multiplayer Online Battle Arena) genre, despite hosting massive games like League of Legends or Dota 2, illustrates an intriguing case.
                    While these games still attract vast communities, their genre probably limits them compared to more frequent crossovers.
                    This underscores how genre clustering can restrict a game’s reach.
                </p>
                <p className="text-justify mb-4">
                    This chord chart reveals how your choice of game can shape the kind of community you belong to.
                    Depending on the genre you prefer, you may find it easier to connect with other players from diverse backgrounds or, conversely, become more deeply immersed in a specific community.
                    Feel free to review this chord chart further and see which genres align with your interests.
                    This will give you an idea of whether you’re ready to expand your horizons or if you would rather stay within a closer circle.
                </p>
            </div>
        </div>

    )
}