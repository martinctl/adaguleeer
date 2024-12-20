'use client';

import { Card, Text, Flex, Grid } from '@radix-ui/themes';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import gameStatsData from '@/data/game_statistics.json';

// Register the required components
echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition
]);

interface GameStatisticsProps {
  gameTitle: string;
}

export function GameStatistics({ gameTitle }: GameStatisticsProps) {
  const gameData = gameStatsData.games[gameTitle.toLowerCase() as keyof typeof gameStatsData.games];

  return (
    <Grid columns="6" gap="4" p="6">
      {gameData.stats.map((stat, index) => (
        <Card key={index} style={{ gridColumn: 'span 2' }}>
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold" className="font-pixel">
              {stat.label}
            </Text>
            <Text size="6" className="font-pixel">
              {stat.value}
            </Text>
          </Flex>
        </Card>
      ))}

      <Card style={{ gridColumn: 'span 6', maxWidth: '1000px', padding: '1rem'}}>
        <div className="space-y-4 text-lg">
          {gameTitle === 'Call of Duty' && (
            <>
              <p className="text-justify">
                The bronze medal goes to the emblematic Call of Duty (CoD).
                Each game in this franchise has been a success.
                Even those considered less impactful still outperform many other games in the industry.
                More than just a big name, this dynasty has maintained its relevance through countless iterations.
              </p>
              <p className="text-justify">
                What makes Call of Duty unique on YouTube is that this cornerstone of war games acts as a unifier for the broader shooter community. 
                Whether your main game is Overwatch, Battlefield, or Doom, you have likely seen Call of Duty content in your feed. 
                The franchise’s regular releases, around one game or extension per year, create engagement peaks across different FPS 
                (First-Person Shooter) communities, giving a boost to a whole part of YouTube gaming.
              </p>
              <p className="text-justify">
                The dedication rate, defined as the proportion of channels that have the game as their primary focus 
                (based on the highest number of videos published) compared to all channels that have posted at least one video about the game, is 30%.
                This leaves a significant portion of creators who play CoD alongside other games.
                This illustrates the diversity of its audience: even if CoD isn’t the primary game for many creators, 
                its gravitational pull ensures that almost everyone in the shooter community engages with it at some point.
              </p>
            </>
          )}

          {gameTitle === 'Fortnite' && (
            <>
              <p className="text-justify">
              Taking the silver medal is Fortnite, a game with a different trajectory and influence compared to Call of Duty. 
              While CoD is a long-standing franchise originating from the early 2000s, Fortnite is a standalone phenomenon. 
              Released in July 2017, it marked a turning point for gaming on YouTube, revolutionizing how communities form and interact. 
              Unlike CoD’s steady presence, Fortnite experienced a huge rise that reshaped the platform’s landscape. 
              At its peak, it seemed like every content creator was uploading Fortnite videos, and every viewer was consuming them.

              </p>
              <p className="text-justify">
              This explosive growth clustered a variety of communities around the same game, 
              creating an unprecedented level of cross-viewers interactions. 
              This can also be seen with the channel dedication rate of …% , 
              as a lot of players approached it but still keeping their videos diversified for a lot of them.
              </p>
            </>
          )}

          {gameTitle === 'Minecraft' && (
            <>
              <p className="text-justify">
              As already revealed by the quiz, the most popular video game of all time claims the crown. 
              Its unmatched versatility appeals to those seeking creativity, exploration, survival, or combat to only name a few. 
              It's impossible to draw up a profile of the typical Minecraft player or viewer, because they simply don't exist. 
              It's only natural that this timeless and polyvalent game should come out on top, as it attracts almost everyone to the platform.
              </p>
              <p className="text-justify">
              …% of the channels producing Minecraft content make it their focus...
              </p>
            </>
          )}
        </div>
      </Card>
    </Grid>
  );
}

