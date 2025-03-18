import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Distance, IPersonalRecord } from "@/types/Stat";
import { CardSprint } from "@/core/CardSprint";
import { getAllPersonalRecords } from "@/services/personalRecordService";
import { toast } from "@/hooks/use-toast";
import { getAllDistances } from "@/services/distanceService";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export function PersonalRecords() {

    const [personalRecords, setPersonalRecords] = useState<IPersonalRecord[]>([])
    const [distances, setDistances] = useState<Distance[]>([])

    useEffect(() => {
        const fetchRecords = async () => {
            const res = await getAllPersonalRecords()
            if (!res.success) {
                toast({ title: 'Hubo un error recuperando records personales', variant: 'destructive' })
                return
            }
            console.log("personalRecords");
            console.log(personalRecords);
            setPersonalRecords(res.data)
        }
        fetchRecords()
    }, [])

    useEffect(() => {
        const fetchDistances = async () => {
            const res = await getAllDistances()
            if (!res.success) {
                toast({ title: 'Hubo un error recuperando records personales', variant: 'destructive' })
                return
            }
            setDistances(res.data)
        }
        fetchDistances()
    }, [])

    const PersonalRecordList = ({ personalRecords }: { personalRecords: IPersonalRecord[] }) => {
        if (personalRecords.length == 0) return <h2 className="pl-14">No tienes record personal en esta distancia</h2>

        return (
            <div className="pl-14 flex flex-row gap-16">
                {personalRecords.map((pr, i) => {
                    const trophy = i == 0 ? 'gold' : i == 1 ? 'silver' : i == 2 ? 'bronze' : undefined;
                    const bgBadge = trophy ? i == 0 ? 'bg-[#f4bf1f]' : i == 1 ? 'bg-[#c4c4c4]' : i == 2 ? 'bg-[#cf8338]' : undefined : undefined;
                    const textDate = format(pr.sprint.date, 'dd/MM/yyyy');
                    return (
                        <div key={pr.id}>
                            <span className={`${bgBadge} px-2 py-1 rounded text-xs font-bold text-muted`}>Récord {textDate}</span>
                            <CardSprint sprint={pr.sprint} trophy={trophy} />
                        </div>
                    )
                })}
            </div>

        )
    }

    const DistanceList = () => {
        if (personalRecords.length == 0 || distances.length == 0) {
            return <Skeleton className="w-[800px] h-[120px]" />
        }

        return (
            <div>
                {distances.map((distance) => {

                    const personalRecordsDistance = personalRecords.filter((pr) => pr.distance.id == distance.id)
                        .sort((a, b) => a.sprint.pace - b.sprint.pace)
                    return (
                        <div className="my-8" key={distance.id}>
                            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                                <h3 className="text-2xl font-semibold">
                                    {distance.distance}m
                                </h3>
                                <CardDescription className="text-wrap max-w-[500px]">
                                    {distance.description}
                                </CardDescription>
                            </CardContent>

                            <PersonalRecordList personalRecords={personalRecordsDistance} />
                        </div>
                    );
                })}
            </div>

        )
    }
    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="flex flex-row items-center gap-6">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>Records personales</CardTitle>
                        <CardDescription>
                            En distancias de 1km, 3k, 5k, 10k, media maratón, maratón
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <DistanceList />

        </Card>
    );
}